/*
export default [
    {
        component: 'formDivider',
        design: require('./src/design/divider').default,
        label: 'Divider'
    },
    // {
    //     component: 'formCollapsible',
    //     data: {
    //         header: '',
    //         open: true,
    //         renderCondition: '',
    //         inputs: []
    //     },
    //     design: require('./src/design/collapsible_group').default,
    //     label: 'Collapsible Group'
    // },
    {
        component: 'formTextMessage',
        data: {
            defaultValue: '``',
            label: '',
            placeholder: '',
            variable: '',
            validateRequired: false,
            maxCharLength: 160,
            displayCharCounter: true,
            mergeFieldInUseMessage:
                '<p>We cannot calculate the exact amount of characters in your message because it contains a variable.</p>\n<p>There are %currentCharCount% characters excluding the variable in your message.</p>',
            inCharLimitMessage:
                '<p>The character limit for an SMS message is %maxCharLength% characters.</p>\n<p>If your message contains more characters, it will be broken down into more than one SMS message.</p>',
            notInCharLimitMessage: 'You have exceeded amount of characters that can be sent via a single SMS.',
            renderCondition: ''
        },
        design: require('./src/design/text_message').default,
        label: 'Text Message'
    },
    {
        component: 'formList',
        data: {
            label: '',
            variable: '',
            addButtonLabel: '',
            dragHandleRight: false,
            singleline: false,
            hasDefaultItem: false,
            inputs: [],
            renderCondition: ''
        },
        design: require('./src/design/list').default,
        isContainer: true,
        label: 'List'
    },
    {
        component: 'formSwitch',
        data: {
            defaultValue: false,
            label: '',
            labelLeft: false,
            variable: '',
            renderCondition: ''
        },
        design: require('./src/design/switch').default,
        label: 'Switch'
    },
    {
        component: 'formWildcard',
        data: {
        },
        design: require('./src/design/wildcard').default,
        edit: require('./src/edit/wildcard').default,
        label: 'Wildcard'
    },
    {
        component: 'formDataOut',
        data: {
            defaultValue: '',
            defaultName: '',
            renderCondition: '',
            label: 'Merge field',
            placeholder: 'Merge field name',
            helpText: 'Specify the name of the merge field where the step’s result will be stored and can be reused later in the flow.',
            validateRequired: false
        },
        design: require('./src/design/data_out').default,
        isDataOut: true,
        label: 'Merge field'
    },
    {
        component: 'formDynamicExits',
        data: {
            label: '',
            variable: 'conditions',
            addButtonLabel: '',
            dragHandleRight: '',
            hasDefaultItem: '',
            renderCondition: '',
            singleline: false,
            labelFunction: 'return item.exitLabel',
            inputs: [
                {
                    component: 'dynamicExitLabel',
                    data: {
                        defaultValue: '',
                        label: '',
                        placeholder: 'label',
                        helpText: 'Exit label.'
                    },
                    label: 'Exit label'
                }
            ]
        },
        design: require('./src/design/dynamic_exits').default,
        isContainer: true,
        isExit: true,
        label: 'List'
    },
    // {
    //     component: 'formTextReprompt',
    //     data: {
    //         label: '',
    //         variable: '',
    //         noReplyDelayVariable: 'noReplyDelay',
    //         defaultValue: {
    //             message: '``',
    //             repeat: false
    //         },
    //         defaultDelay: 3600,
    //         startText: 'Wait for reply for',
    //         endText: 'Go down the no reply path',
    //         maxSections: 3,
    //         placeholder: '',
    //         repeatMessage: 'Repeat the first message after the reprompt',
    //         renderCondition: ''
    //     },
    //     design: require('./src/design/text_reprompt').default,
    //     label: 'Text Reprompt'
    // },
    // {
    //     component: 'formVoiceReprompt',
    //     data: {
    //         label: '',
    //         variable: '',
    //         noReplyDelayVariable: 'noReplyDelay',
    //         defaultValue: {
    //             audioUrl: '``',
    //             message: '``',
    //             repeat: false
    //         },
    //         defaultDelay: 15,
    //         startText: 'Wait for reply for',
    //         endText: 'Go down the no reply path',
    //         maxSections: 3,
    //         placeholder: '',
    //         repeatMessage: 'Repeat the first message after the reprompt',
    //         renderCondition: ''
    //     },
    //     design: require('./src/design/voice_reprompt').default,
    //     label: 'Voice Reprompt'
    // }
];
*/

export default [
    require('./src/exits/static'),
    require('./src/exits/dynamic'),
    require('./src/editors/form'),
    require('./src/inputs/code'),
    require('./src/editors/code'),
    require('./src/inputs/collapsible_group'),
    require('./src/editors/collapsible_group'),
    require('./src/inputs/data_out'),
    require('./src/editors/data_out'),
    require('./src/editors/divider'),
    require('./src/inputs/divider'),
    require('./src/inputs/dynamic_exits'),
    require('./src/editors/dynamic_exits'),
    require('./src/inputs/exits/label'),
    require('./src/inputs/exits/dynamic'),
    require('./src/inputs/exits/static'),
    require('./src/editors/exits/label'),
    require('./src/inputs/header'),
    require('./src/editors/header'),
    require('./src/inputs/list'),
    require('./src/editors/list'),
    require('./src/inputs/select'),
    require('./src/editors/select'),
    require('./src/editors/switch'),
    require('./src/inputs/switch'),
    require('./src/editors/text_message'),
    require('./src/inputs/text_message'),
    // require('./src/editors/text_reprompt'),
    // require('./src/inputs/text_reprompt'),
    require('./src/inputs/textbox'),
    require('./src/editors/textbox'),
    // // require('./src/inputs/voice_reprompt'),
    require('./src/inputs/wildcard'),
    require('./src/editors/wildcard')
    // // require('./src/luis/wrapper')
];

export const meta = {
    name    : 'or-ui-components',
    type    : 'onereach-studio-plugin',
    label   : 'Default components',
    version : '1.0'
};
