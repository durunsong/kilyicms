function opentidioChat() {
    var scriptUrl = '//cdnus.jishiyuchat.com/www/im/jsy_im_plugin.js?code=2482ad1ce3650282cecbb7a0f52bf031';
    function initializePlugin() {
        window.addEventListener('jsy_plugin_ready', function(evt) {
            var jsy_plugin_api = evt.detail;
            window.JSY_PLUGIN_API = jsy_plugin_api; // 赋值给全局变量，便于后续调用
            jsy_plugin_api.setOptions({
                closeButtonVisible: true,       // 显示右上角关闭按钮
                launcherButtonVisible: false,   // 隐藏默认启动按钮
                // email: 'abc@xxx.com',           // 设置默认邮箱地址，设置默认值后会自动执行注册
            });
            // 打开客服弹窗
            jsy_plugin_api.open({
                view: 'RegisterView'            // 显示注册视图，可选参数
            });
        });
    }
    if (!window.JSY_PLUGIN_API) {
        if (!$("script[src='" + scriptUrl + "']").length) {
            $.getScript(scriptUrl, initializePlugin);
        } else {
            initializePlugin();
        }
    } else {
        // 如果脚本已经加载并初始化，直接打开客服弹窗
        window.JSY_PLUGIN_API.open({
            view: 'RegisterView'                // 显示注册视图，可选参数
        });
    }
    return false; // 防止任何默认动作
}