import * as _ from 'lodash';
import * as vuelidators from 'vuelidate/lib/validators';

export const validateBySchema = function (data, schema, siblings) {
    return !_.some(schema, function (validator, key) {

        if (_.isFunction(validator)) {
            return !validator.call(this, data, siblings);

        } else if (_.isObject(validator)) {
            switch (key) {
                case '$each':
                    return _.some(data, item => !validateBySchema.call(this, item, validator, item));

                default:
                    return !validateBySchema.call(this, _.get(data, key), validator, siblings);
            }
        }

        return false;
    }.bind(this));
};

export const validators = _.assign({}, vuelidators, {
    jsCode (value) {
        const body = `return function*(){${value}\n}`;
        try {
            // eslint-disable-next-line no-new-func,no-new
            new Function(body);
            return true;
        } catch (e) {
            return false;
        }
    },

    jsExpression (value) {
        const body = `return (function(example){return example;})(${value});`;
        try {
            // eslint-disable-next-line no-new-func,no-new
            new Function(body);
            return true;
        } catch (e) {
            return false;
        }
    },

    jsExpressionNonEmptyString (value) {
        return !(/^(``|''|"")$/).test(value);
    },

    each (schema) {
        return function (items) {
            return !_.some(items, function (item) { //eslint-disable-line
                return !validateBySchema.call(this, item, schema, item);  //eslint-disable-line
            }.bind(this)); //eslint-disable-line
        };
    },
    mergeFieldName () {
        // TODO describe a valid merge field name
        return true;
    },

    validateIf (renderCondition, validator) {
        if (_.isString(renderCondition) && _.isEmpty(renderCondition)) {
            renderCondition = true;
        }

        let renderConditionFn;
        if (_.isBoolean(renderCondition)) {
            renderConditionFn = renderCondition ? () => true : () => false;
        }

        if (_.isString(renderCondition)) {
            renderConditionFn = new Function('schema', `return ${renderCondition};`);
        }

        if (!renderConditionFn) {
            renderConditionFn = renderCondition;
        }

        return (value, schema) => {
            return !renderConditionFn.bind(this)(schema) || validateBySchema.call(this, value, validator, schema);
        }
    },

    validateInput (template, validator) {
        return {
            [template.variable] : {
                validateIf : validators.validateIf(template.renderCondition, validator)
            }
        };
    }
});
