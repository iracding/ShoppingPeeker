/// <reference path="../Extension/jquery-1.10.2.js" />
/// <reference path="../Extension/applicationCore.js" />

/*封装基本的http访问方法*/
var httpClient = {

    /*创建请求配置*/
    createConfig:function(){
        var instance={
            fordwardUrl :null,
            type :null,
            data :null,
            defaultOk :null,
            defaultFail :null,
            callback :null,
        };
        return instance;
    },

    checkConfig: function (url) {
        if (url == undefined || url.length <= 0) {
            return false;
        } else {
            return true;
        }
    },

    baseAction: function (config) {
        var index = layer.loading({});
        var options = {
            url: config.fordwardUrl,
            type: config.type,
            cache: false,
            success: function (data) {
                if (config.callback != undefined) {
                    config.callback(data);
                } else {
                    if (data.Type == 200) {
                        if (config.defaultOk != undefined) {
                            layer.alert({ content: config.defaultOk });
                        }
                    } else {
                        if (config.defaultFail != undefined) {
                            layer.alert({ content: config.defaultFail });
                        }
                    }
                }
                layer.close(index);
            }
        };
        if (config.data) {
            options.data = config.data;
        }
        $.ajax(options);
    },
    /*GET 请求*/
    get: function (url, paras, callback) {
        if (!httpClient.checkConfig(url)) {
            layer.msg("参数有误，请检查您的参数");
            return;
        }
        //格式化 请求的url
        url = formatUrl(url, paras);
        var config = httpClient.createConfig();
        config.fordwardUrl = url;
        config.type = "GET";
        config.data = { Content: null};
        config.callback = callback;
        httpClient.baseAction(config);
    },

    /*POST请求*/
    post: function (url, data, callback) {
        if (!httpClient.checkConfig(url) || data == undefined) {
            layer.msg("参数有误，请检查您的参数");
            return;
        }
        var config = httpClient.createConfig();
        config.fordwardUrl = url;
        config.type = "POST";
        config.data = data;
        config.defaultOk = "恭喜，添加成功";
        config.defaultFail = "抱歉，添加失败";
        config.callback = callback;
        httpClient.baseAction(config);
    }

}

