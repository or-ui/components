export default [
    {
        component: 'formHeader',
        data: {
            header: ''
        },
        design: require('./src/design/header.vue').default,
        label: 'Header'
    },
    {
        component: 'formDivider',
        design: require('./src/design/divider.vue').default,
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
    //     design: require('./src/design/collapsible_group.vue').default,
    //     label: 'Collapsible Group'
    // },
    {
        component: 'formTextBox',
        data: {
            defaultValue: '``',
            label: '',
            multiline: false,
            placeholder: '',
            helpText: '',
            renderCondition: '',
            variable: '',
            validateRequired: false
        },
        design: require('./src/design/textbox.vue').default,
        label: 'Text box'
    },
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
        design: require('./src/design/text_message.vue').default,
        label: 'Text Message'
    },
    {
        component: 'formCode',
        data: {
            defaultValue: '',
            label: '',
            variable: '',
            helpText: '',
            renderCondition: '',
            validateRequired: false,
            validateExpression: false,
            validateCode: false
        },
        design: require('./src/design/code.vue').default,
        edit: require('./src/edit/code.vue').default,
        label: 'Code'
    },
    {
        component: 'formSelect',
        data: {
            defaultArrayValue: [],
            defaultValue: '',
            label: '',
            multiple: false,
            options: [],
            placeholder: '',
            helpText: '',
            variable: '',
            renderCondition: '',
            validateRequired: false
        },
        design: require('./src/design/select.vue').default,
        label: 'Drop down'
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
        design: require('./src/design/list.vue').default,
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
        design: require('./src/design/switch.vue').default,
        label: 'Switch'
    },
    // {
    //     component: 'formWildcard',
    //     data: {
    //         formTemplate: '',
    //         componentTemplate: '<div><or-textbox name="wildcardInput" label="wildcard Input Label" v-model="computedValue"></or-textbox></div>',
    //         componentLogic:
    //             "{\n  computed : {\n    computedValue : {\n      get () { return this.value; },\n      set (value) { this.$emit('input', value); }\n    }\n  },\n  props : {\n    value : {\n      type : String,\n      default : ''\n    }\n  }\n}",
    //         data: '{"stepVariable": "defaultValue"}',
    //         validators: '{}',
    //         componentOriginalStyles: '',
    //         componentCompiledStyles: '',
    //         wildcardTemplates: []
    //     },
    //     design: require('./src/design/wildcard.vue').default,
    //     label: 'Wildcard'
    // },
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
        design: require('./src/design/data_out.vue').default,
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
        design: require('./src/design/dynamic_exits.vue').default,
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
    //     design: require('./src/design/text_reprompt.vue').default,
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
    //     design: require('./src/design/voice_reprompt.vue').default,
    //     label: 'Voice Reprompt'
    // }
];
