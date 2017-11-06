import * as _ from 'lodash';
import * as vuelidators from 'vuelidate/lib/validators';

export const validateBySchema = function (data, schema, siblings) {
    return _.reduce(schema, function (result, validator, key) {             //eslint-disable-line
        if (!result) {
            return false;
        }
        if (_.isFunction(validator)) {
            return validator.call(this, data, siblings);                    //eslint-disable-line
        } else if (_.isObject(validator)) {
            return validateBySchema.call(this, _.get(data, key), validator, siblings); //eslint-disable-line
        }
        return true;
    }.bind(this), true);                                                    //eslint-disable-line
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
            return _.reduce(items, function (memo, item) {                   //eslint-disable-line
                if (!memo) {
                    return false;
                }
                return validateBySchema.call(this, item, schema, item);  //eslint-disable-line
            }.bind(this), true);                                             //eslint-disable-line
        };
    },
    mergeFieldName () {
        // TODO describe a valid merge field name
        return true;
    }
});
