module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:vue/essential'
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module',
        //"parser": 'babel-eslint'
    },
    'plugins': [
        'vue'
    ],
    'rules': {
        /*"indent": [
                "error",
                "tab"
        ],*/
        'linebreak-style': [
            'error',
            'windows'
        ],
        'semi': [0], // 是否开启强制分号结尾,0的意思是off关闭，1是warning警告，2是error 报错
        'indent': ['error', 4],  // 强制缩进4 spaces
        'vue/script-indent': ['error', 4, {
            'baseIndent': 1,
            'switchCase': 0,
            'ignores': []
        }],// .vue文件的缩进规则
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',  // 代码中是否允许出现consloe.log()，生产环境下不允许
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',// 代码中是否允许出现debugger，生产环境下不允许
        'quotes': [2, 'single', 'avoid-escape'], // 强制使用一致的反勾号、双引号或单引号
        'comma-spacing': [2, {'before': false, 'after': true}],// 控制逗号前后的空格
        'camelcase': 2,//强制驼峰法命名
        'no-var': 0,//禁用var，用let和const代替
        'spaced-comment': 0,// 强制在注释中 // 或 /* 使用一致的空格
        'space-before-function-paren': 0,// 强制在 function的左括号之前使用一致的空格
    },
    'overrides': [
        {
            'files': ['*.vue'],
            'rules': {
                'indent': 'off'
            }
        }
    ],
};
