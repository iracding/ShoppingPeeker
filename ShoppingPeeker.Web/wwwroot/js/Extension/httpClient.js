/// <reference path="../Extension/jquery-1.10.2.js" />
/// <reference path="../Extension/applicationCore.js" />

/*封装基本的http访问方法*/
var httpClient = {

    /*创建请求配置*/
    createConfig:function(){
        var instance={
            fordwardUrl :null,
            type: null,
            contentType: "application/x-www-form-urlencoded",
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
        var options = {
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', '')
            },
            url: config.fordwardUrl,
            type: config.type,
            contentType: config.contentType,
            cache: false,
            success: function (data) {
                if (config.callback != undefined) {
                    config.callback(data, config.callbackParas);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //if (MessageBox) {
                //    MessageBox.error("异步请求失败！状态码：" + textStatus)
                //}
                throw new Error(textStatus);
            }
        };
        if (config.data) {
            options.data = config.data;
        }
        $.ajax(options);
    },
    /*GET 请求*/
    get: function (url, paras, callback, callbackParas) {
        if (!httpClient.checkConfig(url)) {
            alert("参数有误，请检查您的参数");
            return;
        }
        //格式化 请求的url
        url = formatUrl(url, paras);
        var config = httpClient.createConfig();
        config.fordwardUrl = url;
        config.type = "GET";
        //config.data = { Content: null};
        config.callback = callback;
        config.callbackParas = callbackParas;

        httpClient.baseAction(config);
    },

    /*POST请求*/
    post: function (url, data, callback, callbackParas) {
        if (!httpClient.checkConfig(url) || data == undefined) {
            alert("参数有误，请检查您的参数");
            return;
        }
        var config = httpClient.createConfig();
        config.fordwardUrl = url;
        config.type = "POST";
        config.contentType = "application/json",
            config.data = JSON.stringify(data);
        config.callback = callback;
        config.callbackParas = callbackParas;
        httpClient.baseAction(config);
    }

}

