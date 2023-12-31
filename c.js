LadiPageScriptV2.prototype.runOptionForm = function(t, e, i) {
    var a, n = this, o = window.ladi("LADI_CAMP_TARGET_URL").get_cookie(), r = window.ladi("LADI_CAMP_CONFIG").get_cookie(), d = document.getElementsByClassName("ladi-form"), c = 0, s = null, u = null, p = null, l = null, m = null, _ = null, g = null, f = null, y = null, h = null, v = null, E = null, L = null, P = null, A = null, O = null, w = null, T = null, b = n.runtime.shopping, k = null, N = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"], S = ["name", "email", "phone", "address", "ward", "district", "state", "country"], D = ["email", "phone"], C = n.copy(n.runtime.list_set_value_name_country).reverse(), R = function(t, e) {
        var i = "_capture_" + t
          , a = window.ladi(i).get_cookie()
          , o = !1
          , r = n.runtime.tmp["cookie_cache_otp_" + t];
        if (isEmptyLadiPage(a) && isObjectLadiPage(r) && !isEmptyLadiPage(r[i]) && (a = r[i],
        o = !0),
        isEmptyLadiPage(a)) {
            a = e + "|" + n.runtime.ladipage_id + "|" + Date.now() + "|" + n.randomId();
            var d = new Date;
            d.setTime(d.getTime() + 9e5),
            o ? (r[i] = a,
            n.runtime.tmp["cookie_cache_otp_" + t] = r) : window.ladi(i).set_cookie(a, d)
        }
        return a
    }, I = function(t, e, i) {
        var a = n.runtime.tmp["form_data_ladi_" + h];
        if (isObjectLadiPage(a))
            return !0;
        if (e && isEmptyLadiPage(u[i]))
            return !1;
        var o = [];
        if (w.forEach(function(t) {
            isEmptyLadiPage(u[t]) && o.push(t)
        }),
        e && (o = o.only([i])),
        o.length > 0)
            return e || n.showMessage(n.const.LANG.FORM_INPUT_REQUIRED_ERROR, null, function() {
                var e = t.querySelector('[name="' + o[0] + '"]');
                isEmptyLadiPage(e) || e.focus()
            }),
            !1;
        var r = !0
          , d = t.getElementsByClassName("ladi-survey");
        for (g = 0; g < d.length; g++) {
            var c = n.findAncestor(d[g], "ladi-element");
            if (!isEmptyLadiPage(c)) {
                var s = n.runtime.eventData[c.id];
                if (!isEmptyLadiPage(s) && s["option.survey_setting.input_required"] && !isEmptyLadiPage(s["option.survey_setting.input_name"])) {
                    var p = c.id
                      , l = t.querySelector('.ladi-element.ladi-form-item-survey[data-name="' + s["option.survey_setting.input_name"] + '"]');
                    isEmptyLadiPage(l) || (p = l.id);
                    var m = window.ladi(p).value();
                    if (isEmptyLadiPage(m)) {
                        r = !1;
                        break
                    }
                }
            }
        }
        if (!r)
            return e || n.showMessage(n.const.LANG.FORM_INPUT_REQUIRED_ERROR),
            !1;
        var _ = !0
          , g = 0
          , f = function() {
            var e = t.querySelector('[name="' + T[g].name + '"]');
            isEmptyLadiPage(e) || e.focus()
        };
        for (g = 0; g < T.length; g++)
            if (!e || T[g].name == i) {
                var y = u[T[g].name];
                if (!isEmptyLadiPage(y))
                    try {
                        if (!new RegExp("^" + T[g].pattern + "$",T[g].pattern_flag).test(y)) {
                            e || n.showMessage(T[g].title, null, f),
                            _ = !1;
                            break
                        }
                    } catch (t) {}
            }
        return _
    }, F = function(t, e) {
        u = {},
        p = {},
        l = {};
        for (var i = t.querySelectorAll(".ladi-element .ladi-form-item-container [name]"), a = {}, o = null, r = 0; r < i.length; r++)
            o = i[r].getAttribute("name"),
            a[o] = parseInt(i[r].getAttribute("tabindex")) || 0;
        var d = Object.keys(a).sort(function(t, e) {
            return a[t] - a[e]
        });
        if (d.only(n.runtime.list_set_value_name_country).length == n.runtime.list_set_value_name_country.length)
            for (var c = 0; c < d.length; c++) {
                var s = n.runtime.list_set_value_name_country.indexOf(d[c]);
                -1 != s && (d[c] = C[s])
            }
        for (var _ = 0; _ < d.length; _++)
            u[d[_]] = "";
        g = d;
        for (var f = 0; f < i.length; f++) {
            o = i[f].getAttribute("name"),
            i[f].required && -1 == w.indexOf(o) && w.push(o);
            var y = null;
            if ("INPUT" == i[f].tagName) {
                y = i[f].getAttribute("type").trim().toLowerCase();
                var h = i[f].getAttribute("pattern")
                  , v = i[f].getAttribute("title");
                if ("email" == y ? T.push({
                    name: o,
                    pattern: '(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))',
                    pattern_flag: "gi",
                    title: n.const.LANG.FORM_INPUT_EMAIL_REGEX
                }) : isEmptyLadiPage(h) || T.push({
                    name: o,
                    pattern: h,
                    title: isEmptyLadiPage(v) ? n.const.LANG.FORM_INPUT_TEXT_REGEX : v
                }),
                "checkbox" == y) {
                    isArrayLadiPage(u[o]) || (u[o] = []),
                    i[f].checked && u[o].push(i[f].value);
                    continue
                }
                if ("radio" == y) {
                    i[f].checked && (u[o] = i[f].value);
                    continue
                }
            }
            if (u[o] = i[f].value,
            i[f].classList.contains("ladi-form-control-file") && (u[o] = JSON.parse(i[f].getAttribute("data-path-file") || "[]"),
            l[o] = !0),
            "coupon" == o && "INPUT" == i[f].tagName && "text" == y && "true" == i[f].getAttribute("data-replace-coupon") && (u[o] = n.runtime.tmp.current_use_coupon || ""),
            "INPUT" == i[f].tagName && "date" == y && !isEmptyLadiPage(u[o])) {
                var E = i[f].getAttribute("date-format") || "dd-mm-yyyy"
                  , L = new Date(u[o]);
                E = (E = (E = (E = E.replaceAll("dd", (L.getDate() < 10 ? "0" : "") + L.getDate())).replaceAll("mm", (L.getMonth() + 1 < 10 ? "0" : "") + (L.getMonth() + 1))).replaceAll("yyyy", L.getFullYear())).replaceAll("yy", L.getFullYear() - 2e3),
                u[o] = E
            }
        }
        e || S.forEach(function(t) {
            isNullLadiPage(u[t]) || n.setCookieDomains("_ladipage_" + t, u[t], 365)
        }),
        m = n.runtime.tmp.convertFormDataObjectCountry(u)
    }, M = function(t, e, a, d, p) {
        var m = {
            form_config_id: f,
            ladi_form_id: h,
            ladipage_id: n.runtime.ladipage_id,
            tracking_form: [],
            form_data: [],
            data_key: d
        };
        if (a)
            m.status_send = n.const.STATUS_SEND.capture;
        else if (m.status_send = n.const.STATUS_SEND.sendform,
        b) {
            var _ = window.ladi("_checkout_token").get_cookie();
            isEmptyLadiPage(_) || (m.checkout_token = _)
        }
        if (!isEmptyLadiPage(v)) {
            var w = v.getElementsByClassName("ladiflow-widget")[0];
            isEmptyLadiPage(w) || (isObjectLadiPage(m.options) || (m.options = {}),
            m.options.ladiflow_trigger_id = w.getAttribute("ladiflow-trigger-id"),
            m.options.ladiflow_ref = w.getAttribute("ladiflow-ref"),
            m.options.ladiflow_page_id = w.getAttribute("page_id"),
            m.options.ladiflow_checkbox_user_ref = w.getAttribute("user_ref"),
            m.options.ladiflow_store_id = w.getAttribute("ladiflow-store-id"),
            c = 1e3,
            s = function() {
                isObjectLadiPage(window.LadiFlow) && isFunctionLadiPage(window.LadiFlow.resetWidgetCheckbox) && window.LadiFlow.resetWidgetCheckbox(w.id)
            }
            )
        }
        isEmptyLadiPage(E) || ["option.sync_ladisales_form_account_id", "option.sync_ladiflow_form_account_id", "option.sync_ladishare_form_account_id", "option.sync_ladichat_form_account_id"].forEach(function(t) {
            isEmptyLadiPage(E[t]) || (isObjectLadiPage(m.options) || (m.options = {}),
            isArrayLadiPage(m.options.external_form_config_ids) || (m.options.external_form_config_ids = []),
            m.options.external_form_config_ids.push(E[t]))
        }),
        e.isFormOtp && !isEmptyLadiPage(y) && (isObjectLadiPage(m.options) || (m.options = {}),
        isObjectLadiPage(m.options.external_otp_config) || (m.options.external_otp_config = {}),
        m.options.external_otp_config.otp_config_id = y),
        isObjectLadiPage(m.options) && (m.options = JSON.stringify(m.options)),
        isEmptyLadiPage(L) || (m.total_revenue = L),
        isEmptyLadiPage(n.runtime.time_zone) || (m.time_zone = n.runtime.time_zone);
        var T = Object.keys(LadiFormApi);
        if (g.forEach(function(t) {
            var e = u[t];
            isArrayLadiPage(e) && 0 == e.length && (e = "");
            var i = {
                name: t,
                value: e = -1 != T.indexOf(t) ? LadiFormApi[t] : e
            };
            l[t] && (i.is_file = !0),
            m.form_data.push(i)
        }),
        (T = T.except(g)).forEach(function(t) {
            m.form_data.push({
                name: t,
                value: LadiFormApi[t]
            })
        }),
        b) {
            if (!isNullLadiPage(P)) {
                m.form_data.push({
                    name: "cart_products",
                    value: P,
                    is_ladipage: !0
                }),
                isEmptyLadiPage(n.runtime.tmp.add_to_cart_shipping_method_id) || m.form_data.push({
                    name: "cart_shipping",
                    value: n.runtime.tmp.add_to_cart_shipping_method_id + "|" + (n.runtime.tmp.add_to_cart_fee_shipping || 0),
                    is_ladipage: !0
                });
                var S = m.form_data.findIndex(function(t) {
                    return "coupon" == t.name
                });
                -1 != S && (m.form_data[S].is_ladipage = !0)
            }
            isEmptyLadiPage(L) || m.form_data.push({
                name: "cart_revenue",
                value: L,
                is_ladipage: !0
            }),
            isEmptyLadiPage(n.runtime.tmp.current_use_coupon) || m.form_data.push({
                name: "cart_coupon_amount",
                value: n.runtime.tmp.add_to_cart_discount || 0,
                is_ladipage: !0
            })
        }
        n.runtime.has_popupx && m.tracking_form.push({
            name: "origin_url_page",
            value: n.runtime.tmp.popupx_origin_url
        }),
        N.forEach(function(t) {
            var e = k[t];
            e = isNullLadiPage(e) ? "" : e,
            m.tracking_form.push({
                name: t,
                value: e
            })
        }),
        m.tracking_form.push({
            name: "variant_url",
            value: o
        }),
        m.tracking_form.push({
            name: "variant_content",
            value: n.generateVariantContentString(r, !0)
        }),
        isEmptyLadiPage(i) || m.tracking_form.push({
            name: n.const.REF_NAME,
            value: i
        }),
        n.runtime.tmp["form_data_ladi_tmp_" + h] = n.copy(m);
        var D = n.runtime.tmp["form_data_ladi_" + h];
        isObjectLadiPage(D) && (m = n.copy(D)),
        isEmptyLadiPage(A) || (m.captcha_token = A,
        m.captcha_type = O);
        e.isFormOtp && (e.isSetOtpId && function() {
            var t = "_otp_id_" + h
              , i = window.ladi(t).get_cookie()
              , a = !1
              , o = n.runtime.tmp["cookie_cache_otp_" + h];
            isEmptyLadiPage(i) && isObjectLadiPage(o) && !isEmptyLadiPage(o[t]) && (i = o[t],
            a = !0);
            var r = new Date
              , d = [];
            isEmptyLadiPage(i) ? d = [n.randomId(), r.getTime(), 1] : ((d = i.split("|"))[1] = parseInt(d[1]) || Date.now(),
            d[2] = parseInt(d[2]) || 1,
            e.isSendOtp || (d[2] += 1),
            d.splice(3)),
            d[2] <= 1 ? m.otp_send = n.const.OTP_TYPE.send : m.otp_send = n.const.OTP_TYPE.resend,
            r.setTime(d[1] + 9e5),
            i = d.join("|"),
            a ? (o[t] = i,
            n.runtime.tmp["cookie_cache_otp_" + h] = o) : window.ladi(t).set_cookie(i, r),
            d.splice(1),
            i = d.join("|"),
            m.otp_id = i
        }(),
        m.is_capture = e.isCapture,
        m.otp_type = n.const.OTP_TYPE.sms,
        m.status_send = n.const.STATUS_SEND.otp),
        e.isSendOtp && (m.otp_code = e.otp_code,
        m.status_send = n.const.STATUS_SEND.sendform),
        isFunctionLadiPage(p) && p(m)
    }, x = function(t) {
        t.reset();
        var e = t.getElementsByClassName("ladi-survey-option");
        for (V = 0; V < e.length; V++)
            e[V].classList.remove("selected");
        var i = t.querySelectorAll(".ladi-element .ladi-form-item-container .ladi-form-checkbox-item input");
        for (V = 0; V < i.length; V++) {
            var a = n.findAncestor(i[V], "ladi-form-checkbox-item").querySelector("span");
            isEmptyLadiPage(a) || a.setAttribute("data-checked", i[V].checked)
        }
        var o = n.findAncestor(t, "ladi-element");
        if (!isEmptyLadiPage(o)) {
            for (var r = document.querySelectorAll('.ladi-form [data-submit-form-id="' + o.id + '"]'), d = 0; d < r.length; d++) {
                var c = n.findAncestor(r[d], "ladi-form");
                if (!isEmptyLadiPage(c) && (c = n.findAncestor(c, "ladi-element"),
                !isEmptyLadiPage(c))) {
                    var s = c.querySelector(".ladi-form-remove-coupon");
                    if (isEmptyLadiPage(s)) {
                        var u = c.querySelector('input[name="coupon"]');
                        isEmptyLadiPage(u) || (u.value = "",
                        n.fireEvent(u, "change"))
                    } else
                        s.click()
                }
            }
            var p = document.getElementById(o.getAttribute("data-form-id-before"));
            isEmptyLadiPage(p) || (p = p.getElementsByClassName("ladi-form")[0],
            x(p))
        }
        for (var l = document.querySelectorAll('[data-combobox-type="delivery_method"]'), m = 0; m < l.length; m++)
            l[m].hasAttribute("data-placeholder") && (l[m].innerHTML = '<option value="">' + l[m].getAttribute("data-placeholder") + "</option>"),
            l[m].setAttribute("data-selected", "");
        for (var _ = document.querySelectorAll(".ladi-google-recaptcha-checkbox[data-widget-id]"), g = 0; g < _.length; g++) {
            var f = _[g].getAttribute("data-widget-id");
            isEmptyLadiPage(f) || window.grecaptcha && isObjectLadiPage(n.runtime.tmp.google_captcha) && n.runtime.tmp.google_captcha.checkbox && isFunctionLadiPage(window.grecaptcha.reset) && window.grecaptcha.reset(f)
        }
        var y = document.querySelectorAll(".ladi-form .ladi-form-checkbox-box-item");
        for (g = 0; g < y.length; g++)
            n.runFormItemOtherChange(y[g].getElementsByClassName("ladi-form-checkbox-item")[0], !0);
        n.runtime.tmp.add_to_cart_shipping_method_id = null
    }, q = function(t, e, i, a) {
        F(i, !1),
        I(i, !1, null) && (M(0, e, !1, a, function(t) {
            n.sendRequest("POST", n.const.API_FORM_DATA, JSON.stringify(t), !0, {
                "Content-Type": "application/json"
            })
        }),
        n.showMessage(n.const.LANG.FORM_SEND_DATA_NO_CONFIG),
        x(i))
    }, j = function() {
        n.showMessage(n.const.LANG.FORM_CAPTCHA_ERROR)
    }, U = function(t, e, i, a, o) {
        if (m = {},
        _ = {},
        g = [],
        w = [],
        T = [],
        F(t, i),
        I(t, i, a)) {
            for (var r = t.querySelectorAll(".ladi-element .ladi-form-item-container [name]"), d = {}, c = null, s = 0; s < r.length; s++)
                c = n.findAncestor(r[s], "ladi-element"),
                d[r[s].getAttribute("name")] = c.id;
            var p = e["option.form_setting"]
              , l = Object.keys(d);
            if ((p.mapping_form_id || []).forEach(function(e) {
                var u = document.getElementById(e);
                if (!isEmptyLadiPage(u)) {
                    u.setAttribute("data-form-id-before", t.id);
                    var p = n.runtime.eventData[u.id];
                    if (!i || !isEmptyLadiPage(p) && p["option.form_auto_capture"]) {
                        isFunctionLadiPage(o.getOtp) && !isEmptyLadiPage(p) && p["option.is_form_otp"] && (isFunctionLadiPage(o.beforeRunOtp) && o.beforeRunOtp(u),
                        n.runtime.func_get_code_otp[u.id] = o.getOtp);
                        var m = [];
                        if (l.forEach(function(t) {
                            var e = window.ladi(d[t]).value();
                            r = u.querySelectorAll('.ladi-element .ladi-form-item-container [name="' + t + '"]');
                            var i = [];
                            for (s = 0; s < r.length; s++)
                                c = n.findAncestor(r[s], "ladi-element"),
                                i.push(c.id),
                                t == a && m.push(r[s]);
                            for (i = i.unique(),
                            s = 0; s < i.length; s++)
                                window.ladi(i[s]).value(e)
                        }),
                        i)
                            for (s = 0; s < m.length; s++)
                                n.fireEvent(m[s], "focusout")
                    }
                }
            }),
            !i) {
                var f = e["option.data_event"];
                if (!isArrayLadiPage(f)) {
                    var y = n.copy(p);
                    if (f = [],
                    isObjectLadiPage(y) && (y.type = y.event_type,
                    y.value = y.event_value,
                    y.is_hide_parent = y.event_is_hide_parent,
                    y.change_index_type = y.event_change_index_type,
                    y.change_index_number = y.event_change_index_number,
                    !isEmptyLadiPage(y.value))) {
                        if (y.type != n.const.DATA_ACTION_TYPE.section && y.type != n.const.DATA_ACTION_TYPE.popup || f.push({
                            action_type: n.const.ACTION_TYPE.complete,
                            type: y.type,
                            action: y.value
                        }),
                        y.type == n.const.DATA_ACTION_TYPE.section && y.is_hide_parent || y.type == n.const.DATA_ACTION_TYPE.popup) {
                            var h = n.findAncestor(t, "ladi-popup")
                              , v = n.findAncestor(t, "ladi-section")
                              , E = null;
                            isEmptyLadiPage(h) ? isEmptyLadiPage(v) || (E = v.id) : E = (h = n.findAncestor(h, "ladi-element")).id,
                            isEmptyLadiPage(E) || f.push({
                                action_type: n.const.ACTION_TYPE.complete,
                                type: n.const.DATA_ACTION_TYPE.hidden_show,
                                hidden_ids: [E],
                                show_ids: []
                            })
                        }
                        y.type == n.const.DATA_ACTION_TYPE.change_index && f.push({
                            action_type: n.const.ACTION_TYPE.complete,
                            type: y.type,
                            action: y.value,
                            change_index_type: y.change_index_type,
                            change_index_number: y.change_index_number
                        })
                    }
                }
                n.runtime.tmp.runDataEventNow(t, f, {
                    action_type: n.const.ACTION_TYPE.complete
                })
            }
            o.isRunTracking && n.runEventTracking(t.id, {
                is_form: !0,
                is_form_multiple: !0
            }, u)
        }
    }, Y = function(e, a, o, r, d, S) {
        if (k = n.getURLSearchParams(null, null, !1),
        c = 0,
        s = null,
        u = {},
        p = {},
        l = {},
        m = {},
        _ = {},
        g = [],
        f = null,
        y = null,
        h = null,
        v = null,
        E = null,
        L = null,
        P = null,
        A = a.captcha_token,
        isObjectLadiPage(n.runtime.tmp.google_captcha) && (O = n.runtime.tmp.google_captcha.type,
        !o && isEmptyLadiPage(A) && a.hasOwnProperty("captcha_token")))
            j();
        else {
            w = [],
            T = [],
            b = n.findAncestor(e, "ladi-popup"),
            isEmptyLadiPage(b) ? b = !1 : (b = n.findAncestor(b, "ladi-element"),
            b = !isEmptyLadiPage(b) && "POPUP_CHECKOUT" == b.id);
            var D = e.getElementsByClassName("ladi-form")[0];
            if (!isEmptyLadiPage(D)) {
                var C = n.runtime.eventData[e.id];
                if (!isEmptyLadiPage(C)) {
                    if (C["option.is_add_to_cart"])
                        return;
                    f = C["option.form_config_id"],
                    y = isObjectLadiPage(C["option.form_setting"]) ? C["option.form_setting"].otp_config_id : null,
                    h = e.id,
                    v = e,
                    E = C,
                    L = parseFloatLadiPage(C["option.form_purchase_value"]) || 0,
                    b && (L = n.getCartCheckoutPrice(L),
                    P = n.getCartProducts())
                }
                var R = null
                  , U = e.getAttribute("data-button-submit-other")
                  , G = null
                  , H = null;
                if (o) {
                    if (isEmptyLadiPage(r))
                        return;
                    if (F(D, o),
                    !I(D, o, d))
                        return;
                    if (a.captcha && !isEmptyLadiPage(C) && C["option.form_captcha"] && isObjectLadiPage(n.runtime.tmp.google_captcha)) {
                        if (window.grecaptcha)
                            if (n.runtime.tmp.google_captcha.enterprise && window.grecaptcha.enterprise)
                                window.grecaptcha.enterprise.ready(function() {
                                    try {
                                        window.grecaptcha.enterprise.execute(n.runtime.tmp.google_captcha.api_key, {
                                            action: "submit"
                                        }).then(function(t) {
                                            Y(e, {
                                                captcha_token: t
                                            }, o, r, d, S)
                                        })
                                    } catch (t) {}
                                });
                            else if (n.runtime.tmp.google_captcha.checkbox)
                                try {
                                    R = e.getElementsByClassName("ladi-google-recaptcha-checkbox")[0],
                                    isEmptyLadiPage(U) || (R = document.querySelector("#" + U + " .ladi-google-recaptcha-checkbox")),
                                    G = R.getAttribute("data-widget-id"),
                                    H = window.grecaptcha.getResponse(G),
                                    Y(e, {
                                        captcha_token: H
                                    }, o, r, d, S)
                                } catch (t) {}
                            else
                                window.grecaptcha.ready(function() {
                                    try {
                                        window.grecaptcha.execute(n.runtime.tmp.google_captcha.api_key, {
                                            action: "submit"
                                        }).then(function(t) {
                                            Y(e, {
                                                captcha_token: t
                                            }, o, r, d, S)
                                        })
                                    } catch (t) {}
                                });
                        return
                    }
                    M(0, S, o, r, function(t) {
                        var e = t.form_data.findIndex(function(t) {
                            return t.name == d
                        })
                          , i = -1 != e ? t.form_data[e].value : null;
                        !isEmptyLadiPage(n.runtime.tmp.capture_form_data_last[r + "_" + d]) && equalsLadiPage(n.runtime.tmp.capture_form_data_last[r + "_" + d], i) || (n.runtime.tmp.capture_form_data_last[r + "_" + d] = i,
                        n.sendRequest("POST", n.const.API_FORM_DATA, JSON.stringify(t), !0, {
                            "Content-Type": "application/json"
                        }))
                    })
                } else if (isEmptyLadiPage(C))
                    q(0, S, D, r);
                else if (isNullLadiPage(n.runtime.tmp.form_sending) && (n.runtime.tmp.form_sending = {}),
                isNullLadiPage(n.runtime.tmp.form_button_headline) && (n.runtime.tmp.form_button_headline = {}),
                !n.runtime.tmp.form_sending[e.id]) {
                    var B = function() {
                        n.runtime.tmp.form_sending[e.id] = !0;
                        var t = D.querySelector(".ladi-button .ladi-headline");
                        isNullLadiPage(n.runtime.tmp.form_button_headline[e.id]) && (n.runtime.tmp.form_button_headline[e.id] = t.innerHTML),
                        S.isFormOtp || (t.innerHTML = "● ● ●")
                    }
                      , W = D.getElementsByClassName("ladi-button")[0];
                    W = n.findAncestor(W, "ladi-element"),
                    isEmptyLadiPage(U) || (W = document.getElementById(U));
                    var J = function() {
                        delete n.runtime.tmp.form_sending[e.id],
                        D.querySelector(".ladi-button .ladi-headline").innerHTML = n.runtime.tmp.form_button_headline[e.id]
                    };
                    if (a.captcha && !isEmptyLadiPage(C) && C["option.form_captcha"] && isObjectLadiPage(n.runtime.tmp.google_captcha))
                        if (window.grecaptcha)
                            if (B(),
                            n.runtime.tmp.google_captcha.enterprise && window.grecaptcha.enterprise)
                                window.grecaptcha.enterprise.ready(function() {
                                    try {
                                        window.grecaptcha.enterprise.execute(n.runtime.tmp.google_captcha.api_key, {
                                            action: "submit"
                                        }).then(function(t) {
                                            J(),
                                            Y(e, {
                                                captcha_token: t
                                            }, o, r, d, S)
                                        }).catch(function() {
                                            j(),
                                            J()
                                        })
                                    } catch (t) {
                                        j(),
                                        J()
                                    }
                                });
                            else if (n.runtime.tmp.google_captcha.checkbox)
                                try {
                                    R = e.getElementsByClassName("ladi-google-recaptcha-checkbox")[0],
                                    U = e.getAttribute("data-button-submit-other"),
                                    isEmptyLadiPage(U) || (R = document.querySelector("#" + U + " .ladi-google-recaptcha-checkbox")),
                                    G = R.getAttribute("data-widget-id"),
                                    H = window.grecaptcha.getResponse(G),
                                    J(),
                                    Y(e, {
                                        captcha_token: H
                                    }, o, r, d, S)
                                } catch (t) {
                                    j(),
                                    J()
                                }
                            else
                                window.grecaptcha.ready(function() {
                                    try {
                                        window.grecaptcha.execute(n.runtime.tmp.google_captcha.api_key, {
                                            action: "submit"
                                        }).then(function(t) {
                                            J(),
                                            Y(e, {
                                                captcha_token: t
                                            }, o, r, d, S)
                                        }).catch(function() {
                                            j(),
                                            J()
                                        })
                                    } catch (t) {
                                        j(),
                                        J()
                                    }
                                });
                        else
                            n.showMessage(n.const.LANG.FORM_CAPTCHA_LOADING);
                    else {
                        var K = C["option.form_send_ladipage"]
                          , Q = C["option.form_api_data"]
                          , V = C["option.thankyou_type"]
                          , X = C["option.thankyou_value"]
                          , z = C["option.deeplink_value"]
                          , Z = C["option.form_auto_funnel"]
                          , $ = C["option.form_thankyou_funnel"]
                          , tt = function() {
                            isObjectLadiPage(S) && isFunctionLadiPage(S.callbackOtpShowThankYouDone) && S.callbackOtpShowThankYouDone(),
                            isFunctionLadiPage(s) && s();
                            var i = !1;
                            if (n.runtime.has_popupx && n.runtime.tmp.popupx_is_inline)
                                i = !0;
                            else if (V != n.const.FORM_THANKYOU_TYPE.url) {
                                var a = n.findAncestor(e, "ladi-popup");
                                isEmptyLadiPage(a) || (a = n.findAncestor(a, "ladi-element"),
                                n.runRemovePopup(a.id, t))
                            }
                            var o = 0;
                            if (!n.runtime.isBrowserDesktop && !isEmptyLadiPage(z)) {
                                o = 1e3,
                                z = window.ladi(z).encode_thankyou_url();
                                var r = n.convertDataReplaceStr(z, !0, null, !1, _);
                                window.ladi(r).open_url()
                            }
                            var d = window.ladi("LADI_FUNNEL_NEXT_URL").get_cookie();
                            if (!$ || isEmptyLadiPage(d)) {
                                if (V == n.const.FORM_THANKYOU_TYPE.default && (isEmptyLadiPage(X) || n.showMessage(X, _)),
                                V == n.const.FORM_THANKYOU_TYPE.popup && (Z && n.setDataReplaceElement(!1, !1, _, X),
                                window.ladi(X).show(!1, {
                                    formThankyouPopupXInline: i
                                })),
                                V == n.const.FORM_THANKYOU_TYPE.url && !isEmptyLadiPage(X)) {
                                    X = window.ladi(X).encode_thankyou_url();
                                    var c = window.ladi(X).get_url(p, Z, !1);
                                    n.runTimeout(function() {
                                        window.ladi(c).open_url()
                                    }, o)
                                }
                            } else {
                                d = window.ladi(d).encode_thankyou_url();
                                var u = window.ladi(d).get_url(p, Z, !1);
                                n.runTimeout(function() {
                                    window.ladi(u).open_url()
                                }, o)
                            }
                        };
                        if (C["option.only_facebook_widget"]) {
                            if (isObjectLadiPage(window.LadiFlow) && isFunctionLadiPage(window.LadiFlow.confirmCheckbox))
                                for (var et = e.getElementsByClassName("ladiflow-widget"), it = 0; it < et.length; it++)
                                    window.LadiFlow.confirmCheckbox(et[it].id);
                            return n.runEventTracking(e.id, {
                                is_form: !0,
                                is_facebook_widget: !0
                            }, u),
                            void tt()
                        }
                        if (isEmptyLadiPage(f) && isEmptyLadiPage(C["option.sync_ladisales_form_account_id"]) && isEmptyLadiPage(C["option.sync_ladiflow_form_account_id"]) && isEmptyLadiPage(C["option.sync_ladishare_form_account_id"]) && isEmptyLadiPage(C["option.sync_ladichat_form_account_id"]))
                            q(0, S, D, r);
                        else if (F(D, o),
                        I(D, o, d)) {
                            var at = 0
                              , nt = 0
                              , ot = null
                              , rt = []
                              , dt = !1
                              , ct = !1
                              , st = !0
                              , ut = function(t) {
                                t && x(D),
                                J()
                            }
                              , pt = function(t) {
                                if (-1 != [n.const.FORM_CONFIG_TYPE.sapo, n.const.FORM_CONFIG_TYPE.shopify, n.const.FORM_CONFIG_TYPE.haravan, n.const.FORM_CONFIG_TYPE.wordpress].indexOf(n.runtime.shopping_product_type) && n.runtime.tmp.cart.length > 0) {
                                    var e = !1;
                                    -1 != [n.const.FORM_CONFIG_TYPE.haravan, n.const.FORM_CONFIG_TYPE.wordpress].indexOf(n.runtime.shopping_product_type) && (e = !0);
                                    var i = n.runtime.tmp.cart[0];
                                    return i = JSON.stringify(i),
                                    i = encodeURIComponent(i),
                                    void n.removeAddToCartProduct(i, !1, e, function(e) {
                                        e ? pt(t) : isFunctionLadiPage(t) && t()
                                    })
                                }
                                -1 != [n.const.FORM_CONFIG_TYPE.ladisales].indexOf(n.runtime.shopping_product_type) && (window.ladi("_cart_token").delete_cookie(),
                                window.ladi("_checkout_token").delete_cookie(),
                                n.createCartData()),
                                isFunctionLadiPage(t) && t()
                            }
                              , lt = function(t, a, o, r) {
                                if (o.readyState == XMLHttpRequest.DONE) {
                                    var d = {};
                                    try {
                                        d = JSON.parse(t)
                                    } catch (t) {}
                                    d = isObjectLadiPage(d) ? d : {},
                                    r == n.const.API_FORM_DATA ? 200 == d.code ? at++ : (1 != d.code || isEmptyLadiPage(d.message) || (ot = d.message),
                                    nt++,
                                    st = !1) : 200 == a || 201 == a ? at++ : n.getElementAHref(r).host == n.const.DOMAIN_GOOGLE_DOCS ? at++ : nt++,
                                    at + nt == rt.length && (st && !dt && at >= 1 ? (dt = !0,
                                    isFunctionLadiPage(S.callbackOtp) && S.callbackOtp(!0),
                                    isObjectLadiPage(S) && isFunctionLadiPage(S.callbackThankyou) ? (J(),
                                    S.callbackThankyou(S, function() {
                                        pt(function() {
                                            ut(!0),
                                            n.runtime.tmp.current_use_coupon = null
                                        })
                                    })) : (function() {
                                        p = n.copy(u),
                                        _ = n.copy(m),
                                        Object.keys(n.runtime.replaceStr).forEach(function(t) {
                                            p.hasOwnProperty(t) || (p[t] = n.runtime.replaceStr[t]),
                                            _.hasOwnProperty(t) || (_[t] = n.runtime.replaceStr[t])
                                        });
                                        var t = [];
                                        isEmptyLadiPage(i) || t.push({
                                            key: n.const.REF_NAME,
                                            value: i
                                        }),
                                        t.forEach(function(t) {
                                            p.hasOwnProperty(t.key) || (p[t.key] = t.value),
                                            _.hasOwnProperty(t.key) || (_[t.key] = t.value)
                                        })
                                    }(),
                                    function(t, e, i) {
                                        var a = null
                                          , o = !1
                                          , r = function(t, e) {
                                            o || (isFunctionLadiPage(i) && i(t, e),
                                            n.removeTimeout(a),
                                            o = !0)
                                        };
                                        a = n.runTimeout(r, 3e3),
                                        n.runtime.tmp.runTrackingAnalytics("FormSubmit", {
                                            ladi_form_id: t,
                                            total_revenue: e
                                        }, r)
                                    }(e.id, L, function(t, i) {
                                        n.runEventTracking(e.id, {
                                            is_form: !0,
                                            event: {
                                                target: W
                                            }
                                        }, u),
                                        window.ladi("_capture_" + e.id).delete_cookie(),
                                        isObjectLadiPage(S) && isFunctionLadiPage(S.callbackOtpDone) && S.callbackOtpDone(),
                                        pt(function() {
                                            n.runTimeout(function() {
                                                ut(!0),
                                                n.runtime.tmp.current_use_coupon = null,
                                                tt()
                                            }, 500)
                                        })
                                    }))) : !ct && nt >= 1 && (isFunctionLadiPage(S.callbackOtp) && S.callbackOtp(!1),
                                    ct = !0,
                                    n.showMessage(ot || n.const.LANG.REQUEST_SEND_ERROR),
                                    ut(!1)))
                                }
                            }
                              , mt = function(t) {
                                rt.push({
                                    url: n.const.API_FORM_DATA,
                                    data: JSON.stringify(t),
                                    async: !0,
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    callback: lt
                                })
                            };
                            K && M(0, S, o, r, mt),
                            isArrayLadiPage(Q) && Q.forEach(function(t) {
                                if (!isEmptyLadiPage(t.api_url) && isArrayLadiPage(t.custom_fields)) {
                                    var e = n.getElementAHref(t.api_url).host == n.const.DOMAIN_GOOGLE_DOCS
                                      , i = {}
                                      , a = null
                                      , o = null
                                      , r = null
                                      , d = null;
                                    t.custom_fields.forEach(function(t) {
                                        if (b && ("cart_products" == t.ladi_name && (a = t.name),
                                        "cart_revenue" == t.ladi_name && (o = t.name),
                                        "cart_shipping" == t.ladi_name && (r = t.name),
                                        "cart_coupon_amount" == t.ladi_name && (d = t.name)),
                                        !l[t.ladi_name]) {
                                            var e = m[t.ladi_name];
                                            isNullLadiPage(e) || (isArrayLadiPage(e) ? 0 == e.length ? i[t.name] = "" : i[t.name] = JSON.stringify(e) : i[t.name] = e)
                                        }
                                    }),
                                    isEmptyLadiPage(a) || isNullLadiPage(P) || (i[a] = JSON.stringify(P)),
                                    isEmptyLadiPage(o) || isNullLadiPage(L) || (i[o] = L),
                                    isEmptyLadiPage(r) || isNullLadiPage(n.runtime.tmp.add_to_cart_shipping_method_id) || (i[r] = n.runtime.tmp.add_to_cart_shipping_method_id + "|" + (n.runtime.tmp.add_to_cart_fee_shipping || 0)),
                                    isEmptyLadiPage(d) || isEmptyLadiPage(n.runtime.tmp.current_use_coupon) || (i[d] = n.runtime.tmp.add_to_cart_discount || 0);
                                    var c = {};
                                    if (!isEmptyLadiPage(t.api_request_header))
                                        try {
                                            var s = JSON.parse(t.api_request_header);
                                            Object.keys(s).forEach(function(t) {
                                                c[t] = s[t]
                                            })
                                        } catch (t) {}
                                    if (!e)
                                        i.link = window.location.href,
                                        n.runtime.has_popupx && (i.origin_link = n.runtime.tmp.popupx_origin_url),
                                        Object.keys(LadiFormApi).forEach(function(t) {
                                            i[t] = LadiFormApi[t]
                                        }),
                                        N.forEach(function(t) {
                                            var e = k[t];
                                            isNullLadiPage(e) || (i[t] = e)
                                        });
                                    var u = null
                                      , p = t.content_type || n.const.CONTENT_TYPE.form_urlencoded;
                                    if (p == n.const.CONTENT_TYPE.form_urlencoded && (c["Content-Type"] = "application/x-www-form-urlencoded",
                                    u = Object.keys(i).reduce(function(t, e) {
                                        return t.push(e + "=" + encodeURIComponent(i[e])),
                                        t
                                    }, []).join("&")),
                                    p == n.const.CONTENT_TYPE.json && (c["Content-Type"] = "application/json",
                                    u = JSON.stringify(i)),
                                    p == n.const.CONTENT_TYPE.form_data)
                                        u = new FormData,
                                        Object.keys(i).forEach(function(t) {
                                            u.append(t, i[t])
                                        });
                                    rt.push({
                                        url: t.api_url,
                                        data: u,
                                        async: !0,
                                        headers: c,
                                        callback: lt
                                    })
                                }
                            });
                            (rt.length > 0 || !K) && B(),
                            n.runTimeout(function() {
                                0 == rt.length && (K ? q(0, S, D, r) : M(0, S, o, r, mt)),
                                rt.forEach(function(t) {
                                    n.sendRequest("POST", t.url, t.data, t.async, t.headers, t.callback)
                                })
                            }, c)
                        }
                    }
                }
            }
        }
    }, G = function(t) {
        var e = n.findAncestor(t.target, "ladi-element");
        if (!isEmptyLadiPage(e))
            for (var i = e.querySelectorAll('[type="checkbox"]'), a = 0; a < i.length; a++)
                i[a].removeAttribute("required")
    }, H = function(t) {
        var e = n.findAncestor(t.target, "ladi-element");
        if (!isEmptyLadiPage(e)) {
            n.setEventDataFormDynamic(e.id);
            var a = n.runtime.eventData[e.id];
            if (!isEmptyLadiPage(a) && a["option.is_form_otp"])
                return !1;
            for (var o = e.querySelectorAll('[ladi-checkbox-required="true"]'), r = -1, d = 0; d < o.length; d++)
                if (0 == o[d].querySelectorAll('[type="checkbox"]:checked').length) {
                    r = d;
                    break
                }
            if (-1 == r) {
                var c = function(t) {
                    var i = !1
                      , n = null;
                    isEmptyLadiPage(a["option.form_config_id"]) || ((a["option.form_auto_capture"] || t.isFormOtp) && (n = R(e.id, a["option.form_config_id"])),
                    a["option.form_auto_capture"] && (i = !0));
                    var o = {
                        captcha: !0
                    };
                    (t.isResendOtp || t.isSendOtp) && (o.captcha = !1),
                    t.isFormOtp && (t.isCapture = i),
                    Y(e, o, !1, n, null, t)
                }
                  , s = function(t) {
                    window.ladi("_capture_" + e.id).delete_cookie(),
                    window.ladi("_otp_id_" + e.id).delete_cookie();
                    var i = [];
                    isObjectLadiPage(a["option.form_setting"]) && (i = a["option.form_setting"].mapping_form_id || []),
                    i.forEach(function(e) {
                        window.ladi("_otp_time_" + e).delete_cookie(),
                        t && delete n.runtime.tmp["cookie_cache_otp_" + e]
                    }),
                    t && (delete n.runtime.tmp["cookie_cache_otp_" + e.id],
                    delete n.runtime.tmp["form_data_ladi_" + e.id],
                    delete n.runtime.tmp["form_data_ladi_tmp_" + e.id])
                }
                  , p = function(t) {
                    var e = t.getElementsByClassName("ladi-form")[0]
                      , i = n.findAncestor(t, ["ladi-popup", "ladi-element"])
                      , a = function() {
                        var i = t.getAttribute("data-form-id-before");
                        delete n.runtime.func_get_code_otp[t.id],
                        delete n.runtime.tmp["cookie_cache_otp_" + t.id],
                        delete n.runtime.tmp["cookie_cache_otp_" + i],
                        delete n.runtime.tmp["form_data_ladi_" + i],
                        delete n.runtime.tmp["form_data_ladi_tmp_" + i],
                        window.ladi("_otp_time_" + t.id).delete_cookie(),
                        window.ladi("_otp_id_" + i).delete_cookie(),
                        t.removeAttribute("data-form-id-before"),
                        e.onsubmit = function() {
                            return !1
                        }
                    }
                      , o = function() {
                        isEmptyLadiPage(i) || window.ladi(i.id).hide(),
                        e.reset()
                    };
                    e.onsubmit = function() {
                        var e = t.querySelector('input[name="otp"]');
                        return isEmptyLadiPage(e) || (e = e.value.trim(),
                        c({
                            isFormOtp: !0,
                            isSetOtpId: !0,
                            isSendOtp: !0,
                            otp_code: e,
                            callbackOtpDone: a,
                            callbackOtpShowThankYouDone: o
                        })),
                        !1
                    }
                }
                  , l = function(t, e) {
                    c({
                        isFormOtp: !0,
                        isSetOtpId: !0,
                        isResendOtp: t,
                        callbackOtp: e,
                        callbackThankyou: f
                    })
                }
                  , f = function(t, i) {
                    t.isFormOtp && !t.isResendOtp && function() {
                        var t = {};
                        t["_capture_" + e.id] = null,
                        t["_otp_id_" + e.id] = null;
                        var i = Object.keys(t);
                        i.forEach(function(e) {
                            t[e] = window.ladi(e).get_cookie()
                        }),
                        n.runtime.tmp["cookie_cache_otp_" + e.id] = t;
                        var o = [];
                        isObjectLadiPage(a["option.form_setting"]) && (o = a["option.form_setting"].mapping_form_id || []),
                        o.forEach(function(e) {
                            (t = {})["_otp_time_" + e] = null,
                            (i = Object.keys(t)).forEach(function(e) {
                                t[e] = window.ladi(e).get_cookie()
                            }),
                            n.runtime.tmp["cookie_cache_otp_" + e] = t
                        }),
                        n.runtime.tmp["form_data_ladi_" + e.id] = n.runtime.tmp["form_data_ladi_tmp_" + e.id]
                    }(),
                    s(!1),
                    U(e, a, !1, null, {
                        isRunTracking: !1,
                        getOtp: l,
                        beforeRunOtp: p
                    }),
                    isFunctionLadiPage(i) && i()
                };
                if (!isEmptyLadiPage(a) && a["option.is_form_login"])
                    !function(t, e) {
                        var i = t.querySelector('input[name="access_key"]');
                        if (!isEmptyLadiPage(i) && !isEmptyLadiPage(i.value)) {
                            for (var a = [], o = 0, r = 1; r <= 50; r++) {
                                var d = window.ladi("_login_token_" + r).get_cookie();
                                0 == o && isEmptyLadiPage(d) && (o = r),
                                a.push(d)
                            }
                            if (0 == o) {
                                for (r = 1; r <= 50; r++)
                                    window.ladi("_login_token_" + r).delete_cookie();
                                a = [],
                                o = 1
                            }
                            n.sendRequest("POST", n.const.API_ACCESS_KEY_LOGIN, JSON.stringify({
                                tokens: a.removeSpace(),
                                url: window.location.href,
                                code: i.value.toUpperCase()
                            }), !0, {
                                "Content-Type": "application/json"
                            }, function(t, e, i, r) {
                                if (i.readyState == XMLHttpRequest.DONE) {
                                    var d = {}
                                      , c = n.const.LANG.FORM_LOGIN_SEND_ERROR;
                                    try {
                                        if (200 == (d = JSON.parse(t)).code) {
                                            var s = a.findIndex(function(t) {
                                                return t == d.data.token
                                            });
                                            -1 != s && (o = s + 1),
                                            window.ladi("_login_token_" + o).set_cookie(d.data.token, 7);
                                            var u = n.getElementAHref(d.data.url, !0)
                                              , p = window.location.search;
                                            return (p.startsWith("?") || p.startsWith("&")) && (p = p.substring(1)),
                                            isEmptyLadiPage(p) || (u.search = u.search + (isEmptyLadiPage(u.search) ? "?" : "&") + p),
                                            void window.ladi(u.href).open_url()
                                        }
                                        c = d.message || c
                                    } catch (t) {}
                                    n.showMessage(c)
                                }
                            })
                        }
                    }(e);
                else if (!isEmptyLadiPage(a) && isObjectLadiPage(a["option.form_setting"]) && a["option.form_setting"].is_multiple)
                    a["option.form_setting"].is_multiple_otp ? (s(!0),
                    l(!1, function(t) {
                        if (t) {
                            var e = [];
                            isObjectLadiPage(a["option.form_setting"]) && (e = a["option.form_setting"].mapping_form_id || []),
                            e.forEach(function(t) {
                                var e = document.getElementById(t);
                                if (!isEmptyLadiPage(e)) {
                                    var i = e.querySelector(".ladi-form-item .button-get-code");
                                    isEmptyLadiPage(i) || (e.setAttribute("data-start-countdown-otp", !0),
                                    i.click())
                                }
                            })
                        }
                    })) : U(e, a, !1, null, {
                        isRunTracking: !0
                    });
                else {
                    if (n.runtime.shopping_product_type == n.const.FORM_CONFIG_TYPE.ladisales && !isNullLadiPage(n.runtime.shopping_config_checkout_id)) {
                        var y = n.findAncestor(e, "ladi-popup");
                        if (!isEmptyLadiPage(y) && (y = n.findAncestor(y, "ladi-element"),
                        !isEmptyLadiPage(y) && "POPUP_CHECKOUT" == y.id))
                            return function(t) {
                                var e = window.ladi("_cart_token").get_cookie()
                                  , a = window.ladi("_checkout_token").get_cookie();
                                m = {},
                                _ = {},
                                g = [],
                                w = [],
                                T = [],
                                F(t, !1);
                                var o = u.email
                                  , r = u.phone;
                                if (isEmptyLadiPage(e) || isEmptyLadiPage(a))
                                    n.showMessage(n.const.LANG.FORM_INPUT_REQUIRED_ERROR);
                                else if (isEmptyLadiPage(o) && isEmptyLadiPage(r))
                                    n.showMessage(n.const.LANG.FORM_INPUT_REQUIRED_ERROR);
                                else {
                                    var d = u.name
                                      , c = u.address
                                      , s = u.message
                                      , p = u.country || "";
                                    p = p.split(":")[0];
                                    var l = u.state || "";
                                    l = l.split(":")[0];
                                    var f = u.district || "";
                                    f = f.split(":")[0];
                                    var y = u.ward || "";
                                    y = y.split(":")[0];
                                    var h = u.coupon
                                      , v = n.runtime.tmp.add_to_cart_shipping_method_id
                                      , E = n.getLadiSaleCheckoutCartProducts()
                                      , L = {
                                        cart_token: e,
                                        checkout_token: a,
                                        discount_code: h,
                                        customer_first_name: d,
                                        customer_email: o,
                                        customer_phone: r,
                                        customer_address: c,
                                        customer_note: s,
                                        customer_country_code: p,
                                        customer_state_id: l,
                                        customer_district_id: f,
                                        customer_ward_id: y,
                                        shipping_method_id: v,
                                        shipping_first_name: d,
                                        shipping_address: c,
                                        shipping_phone: r,
                                        shipping_email: o,
                                        shipping_country_code: p,
                                        shipping_state_id: l,
                                        shipping_district_id: f,
                                        shipping_ward_id: y,
                                        shipping_note: s,
                                        checkout_config_id: n.runtime.shopping_config_checkout_id,
                                        is_export_invoice: 0,
                                        is_generate_url: !0,
                                        variants: E,
                                        utm: {
                                            url_page: window.location.href
                                        }
                                    };
                                    k = n.getURLSearchParams(null, null, !1),
                                    N.forEach(function(t) {
                                        L.utm[t] = isNullLadiPage(k[t]) ? "" : k[t]
                                    }),
                                    isNullLadiPage(k[n.const.LADIFLOW_DATA_KEY_NAME]) || (L.utm[n.const.LADIFLOW_DATA_KEY_NAME] = k[n.const.LADIFLOW_DATA_KEY_NAME]),
                                    n.runtime.has_popupx && (L.utm.origin_url_page = n.runtime.tmp.popupx_origin_url),
                                    isEmptyLadiPage(i) || (L.utm[n.const.REF_NAME] = i),
                                    L.custom_fields = {};
                                    var P = Object.keys(u);
                                    (P = P.except(["name", "email", "phone", "address", "country", "state", "district", "ward", "message", "coupon"])).forEach(function(t) {
                                        L.custom_fields[t] = u[t]
                                    }),
                                    n.sendRequest("POST", n.const.API_LADISALE_CHECKOUT_CREATE, JSON.stringify(L), !0, {
                                        "Content-Type": "application/json"
                                    }, function(t, e, i) {
                                        if (i.readyState == XMLHttpRequest.DONE) {
                                            if (200 == e)
                                                try {
                                                    var a = JSON.parse(t);
                                                    if (200 == a.code && isObjectLadiPage(a.data) && !isEmptyLadiPage(a.data.url)) {
                                                        var o = window.ladi(a.data.url).get_url()
                                                          , r = n.getElementAHref(o, !0)
                                                          , d = n.getURLSearchParams(r.search, null, !1);
                                                        return isEmptyLadiPage(n.runtime.shopping_config_checkout_id) || (d.checkout_config_id = n.runtime.shopping_config_checkout_id),
                                                        d.ladi_redirect_url = window.location.href,
                                                        d = Object.keys(d).reduce(function(t, e) {
                                                            return t.push(e + "=" + encodeURIComponent(d[e])),
                                                            t
                                                        }, []).join("&"),
                                                        r.search = d,
                                                        o = r.href,
                                                        void window.ladi(o).open_url()
                                                    }
                                                    if (!isEmptyLadiPage(a.message))
                                                        return void n.showMessage(a.message)
                                                } catch (t) {}
                                            n.showMessage(n.const.LANG.REQUEST_SEND_ERROR)
                                        }
                                    })
                                }
                            }(e),
                            !1
                    }
                    c({
                        isFormOtp: !1
                    })
                }
            } else {
                var h = o[r].querySelectorAll('[type="checkbox"]');
                if (h.length > 0) {
                    h[0].setAttribute("required", "required");
                    for (var v = 0; v < h.length; v++)
                        h[v].removeEventListener("change", G),
                        h[v].addEventListener("change", G);
                    e.querySelector(".ladi-form").reportValidity()
                }
            }
        }
        return !1
    }, B = function(t, e, i, a) {
        var o = n.findAncestor(t.target, "ladi-form");
        if (!isEmptyLadiPage(o)) {
            var r = n.findAncestor(t.target, "ladi-button");
            r = n.findAncestor(r || t.target, "ladi-element");
            var d = n.findAncestor(o, "ladi-element");
            if (!(isEmptyLadiPage(d) || (i = e ? i : n.runtime.eventData[d.id],
            isEmptyLadiPage(i) || !i["option.is_buy_now"] && !i["option.is_add_to_cart"] || isEmptyLadiPage(i["option.product_type"]) || isEmptyLadiPage(i["option.product_id"])))) {
                var c = function() {
                    var o = n.generateVariantProduct(i, !1, null, null, null, null, !0, !0, c);
                    if (isEmptyLadiPage(o) || isEmptyLadiPage(o.store_info) || isEmptyLadiPage(o.product))
                        isEmptyLadiPage(n.runtime.tmp.timeout_product_info[i["option.product_type"]][i["option.product_id"]]) && n.showMessage(n.const.LANG.ADD_TO_CART_NO_PRODUCT, {
                            name: n.getMessageNameProduct()
                        });
                    else {
                        var s = -1
                          , u = null;
                        if (e) {
                            var p = d.querySelector('[data-variant="true"]');
                            u = n.getProductVariantId(p, o.product),
                            isEmptyLadiPage(u) || (s = o.product.variants.findIndex(function(t) {
                                return t.product_variant_id == u
                            }))
                        } else
                            s = n.getProductVariantIndex(d.id, i);
                        if (-1 != s) {
                            var l = o.product.variants[s].product_id;
                            u = o.product.variants[s].product_variant_id;
                            var m = o.product.name
                              , _ = o.product.variants[s].title
                              , g = o.product.variants[s].price
                              , f = o.product.variants[s].quantity
                              , y = o.product.variants[s].quantity_stock;
                            f = isNullLadiPage(y) ? f : y;
                            var h = isEmptyLadiPage(o.product.variants[s].src) ? "" : o.product.variants[s].src;
                            h = isEmptyLadiPage(h) && isObjectLadiPage(o.product.image) ? o.product.image.src : h,
                            isEmptyLadiPage(h) || !isStringLadiPage(h) || h.startsWith("http://") || h.startsWith("https://") || h.startsWith("//") || (h = "https://" + n.const.STATIC_W_DOMAIN + "/" + h);
                            if (0 == o.product.select_many_service && isArrayLadiPage(n.runtime.tmp.cart) && -1 != n.runtime.tmp.cart.findIndex(function(t) {
                                return t.product_id == l && t.product_variant_id != u && t.quantity > 0
                            }))
                                n.showMessage(n.const.LANG.ADD_TO_CART_PRODUCT_ONLY_ONE, {
                                    name: n.getMessageNameProduct(o.product.variants[s])
                                });
                            else {
                                var v = n.runtime.tmp.cart.findIndex(function(t) {
                                    return t.product_variant_id == u
                                })
                                  , E = !1;
                                if (-1 == v) {
                                    E = !0;
                                    var L = {
                                        store_id: o.store_info.id,
                                        product_id: l,
                                        product_variant_id: u,
                                        name: m,
                                        title: _,
                                        price: g,
                                        image: h,
                                        quantity: 0,
                                        min_buy: o.product.variants[s].min_buy,
                                        max_buy: o.product.variants[s].max_buy,
                                        inventory_checked: o.product.variants[s].inventory_checked,
                                        available_quantity: f,
                                        currency: o.store_info.currency,
                                        product_type: o.product.variants[s].product_type,
                                        package_quantity: o.product.variants[s].package_quantity
                                    };
                                    isObjectLadiPage(L.currency) && !isEmptyLadiPage(L.currency.code) && (L.currency.symbol = n.formatCurrency(null, L.currency.code, !1, !0)),
                                    n.runtime.tmp.cart.push(L),
                                    v = n.runtime.tmp.cart.length - 1
                                }
                                var P = d.querySelector('input[name="quantity"]');
                                if (isEmptyLadiPage(P) || isEmptyLadiPage(P.value))
                                    n.showMessage(n.const.LANG.ADD_TO_CART_QUANTITY_REQUIRED);
                                else {
                                    var A = parseInt(P.value) || 0;
                                    if (A <= 0)
                                        return void n.showMessage(n.const.LANG.ADD_TO_CART_QUANTITY_REQUIRED);
                                    var O = null
                                      , w = 1;
                                    w = o.product.variants[s].min_buy || w;
                                    var T = o.product.variants[s].max_buy;
                                    w > n.runtime.tmp.cart[v].quantity + A && (A = w - n.runtime.tmp.cart[v].quantity);
                                    var b = !1;
                                    if (!isEmptyLadiPage(T) && n.runtime.tmp.cart[v].quantity + A > T && (A = T - n.runtime.tmp.cart[v].quantity) <= 0 && (b = !0,
                                    O = T),
                                    1 == o.product.variants[s].inventory_checked) {
                                        if (w > f)
                                            return void n.showMessage(n.const.LANG.ADD_TO_CART_NO_QUANTITY, {
                                                name: n.getMessageNameProduct(o.product.variants[s], !0)
                                            });
                                        n.runtime.tmp.cart[v].quantity + A > f && (A = f - n.runtime.tmp.cart[v].quantity,
                                        f > 0 && (b = !0,
                                        (isEmptyLadiPage(O) || O > f) && (O = f)))
                                    }
                                    if (b || A <= 0 && f > 0)
                                        n.showMessage(n.const.LANG.ADD_TO_CART_MAX_QUANTITY, {
                                            max: O,
                                            name: n.getMessageNameProduct(o.product.variants[s])
                                        }, function() {
                                            var e = t.target;
                                            e = n.findAncestor(e, "ladi-button"),
                                            isEmptyLadiPage(e) || (e = n.findAncestor(e, "ladi-element"));
                                            var i = n.runtime.eventData[e.id];
                                            if (!isEmptyLadiPage(i)) {
                                                var a = i["option.data_event"];
                                                if (!isArrayLadiPage(a) && (a = [],
                                                isObjectLadiPage(i["option.data_action"]))) {
                                                    var o = n.copy(i["option.data_action"]);
                                                    o.action_type = n.const.ACTION_TYPE.action,
                                                    a.push(o)
                                                }
                                                a.forEach(function(t) {
                                                    t.action_type == n.const.ACTION_TYPE.action && (t.type == n.const.DATA_ACTION_TYPE.popup_cart && window.ladi("POPUP_CART").show(),
                                                    t.type == n.const.DATA_ACTION_TYPE.popup_checkout && (n.runtime.shopping_third_party ? n.getThirdPartyCheckoutUrl(!0, null, {
                                                        event: {
                                                            target: r
                                                        }
                                                    }) : window.ladi("POPUP_CHECKOUT").show(!1, {
                                                        event: {
                                                            target: r
                                                        }
                                                    })))
                                                })
                                            }
                                        });
                                    else if (A > 0) {
                                        var k = !isEmptyLadiPage(o.product.variants[s].start_date) && new Date(o.product.variants[s].start_date).getTime() > Date.now()
                                          , N = !isEmptyLadiPage(o.product.variants[s].end_date) && new Date(o.product.variants[s].end_date).getTime() < Date.now();
                                        if (k)
                                            n.showMessage(n.const.LANG.ADD_TO_CART_PRODUCT_BEFORE_START_DATE, {
                                                name: n.getMessageNameProduct(o.product.variants[s])
                                            });
                                        else if (N)
                                            n.showMessage(n.const.LANG.ADD_TO_CART_PRODUCT_AFTER_END_DATE, {
                                                name: n.getMessageNameProduct(o.product.variants[s])
                                            });
                                        else {
                                            var S = function() {
                                                n.runtime.tmp.cart[v].quantity += A;
                                                var t = {
                                                    product_id: l,
                                                    product_variant_id: u,
                                                    quantity: A
                                                };
                                                t.product_type = n.runtime.tmp.cart[v].product_type,
                                                t.package_quantity = n.runtime.tmp.cart[v].package_quantity;
                                                var e = isObjectLadiPage(n.runtime.tmp.cart[v].currency) && !isEmptyLadiPage(n.runtime.tmp.cart[v].currency.code) ? n.runtime.tmp.cart[v].currency.code : n.runtime.currency
                                                  , i = n.runtime.tmp.cart[v].price;
                                                n.addCartCookie(o.store_info.id, t, function() {
                                                    isFunctionLadiPage(a) && a();
                                                    var t = document.getElementsByClassName("ladi-form-remove-coupon")[0];
                                                    isEmptyLadiPage(t) || t.click(),
                                                    n.updateCartPromotion(),
                                                    n.runEventTracking(null, {
                                                        cart_quantity: A,
                                                        cart_currency: e,
                                                        cart_value: i,
                                                        is_form: !1,
                                                        is_add_to_cart: !0,
                                                        is_custom: !0,
                                                        event: {
                                                            target: r
                                                        }
                                                    })
                                                }, function(t) {
                                                    n.runtime.tmp.cart[v].quantity -= A,
                                                    E && n.runtime.tmp.cart.splice(v, 1),
                                                    n.showMessage(t.message)
                                                }, function() {
                                                    LadiPageShopping.push(function() {
                                                        n.runtime.tmp.generateCart()
                                                    }),
                                                    LadiPageShopping.push(function() {
                                                        n.changeTotalPriceCart()
                                                    }),
                                                    n.runtime.tmp.is_click_add_to_cart = !1,
                                                    0 == n.runtime.tmp.cart.length && -1 != [n.const.FORM_CONFIG_TYPE.ladisales].indexOf(n.runtime.shopping_product_type) && (window.ladi("_cart_token").delete_cookie(),
                                                    window.ladi("_checkout_token").delete_cookie()),
                                                    n.runResizeAll()
                                                })
                                            };
                                            if (isEmptyLadiPage(window.ladi("_cart_token").get_cookie()))
                                                if (n.runtime.tmp.is_click_add_to_cart) {
                                                    var D = function() {
                                                        n.runTimeout(function() {
                                                            if (n.runtime.tmp.is_click_add_to_cart)
                                                                return D();
                                                            c()
                                                        }, 100)
                                                    };
                                                    D()
                                                } else
                                                    n.runtime.tmp.is_click_add_to_cart = !0,
                                                    S();
                                            else
                                                S()
                                        }
                                    } else
                                        f <= 0 && n.showMessage(n.const.LANG.ADD_TO_CART_NO_QUANTITY, {
                                            name: n.getMessageNameProduct(o.product.variants[s], !0)
                                        })
                                }
                            }
                        } else
                            n.showMessage(n.const.LANG.ADD_TO_CART_PRODUCT_REQUIRED, {
                                name: n.getMessageNameProduct(o.product.variants[s])
                            })
                    }
                };
                LadiPageShopping.push(function() {
                    c()
                })
            }
        }
    }, W = function(t) {
        B(t, !1, null, function() {
            var e = n.findAncestor(t.target, "ladi-button");
            e = n.findAncestor(e || t.target, "ladi-element");
            var i = n.runtime.eventData[e.id];
            if (!isEmptyLadiPage(i)) {
                var a = i["option.data_event"];
                if (!isArrayLadiPage(a) && (a = [],
                isObjectLadiPage(i["option.data_action"]))) {
                    var o = n.copy(i["option.data_action"]);
                    o.action_type = n.const.ACTION_TYPE.action,
                    a.push(o)
                }
                a.forEach(function(t) {
                    if (t.action_type == n.const.ACTION_TYPE.action) {
                        var i = null;
                        t.type == n.const.DATA_ACTION_TYPE.popup_cart && (i = "POPUP_CART"),
                        t.type == n.const.DATA_ACTION_TYPE.popup_checkout && (i = "POPUP_CHECKOUT"),
                        t.type == n.const.DATA_ACTION_TYPE.popup_checkout && n.runtime.shopping_third_party ? n.getThirdPartyCheckoutUrl(!0, null, {
                            event: {
                                target: e
                            }
                        }) : isEmptyLadiPage(i) || window.ladi(i).show(!1, {
                            event: {
                                target: e
                            }
                        })
                    }
                }),
                n.runEventTracking(e.id, {
                    is_form: !1
                })
            }
        })
    }, J = function(t) {
        var e = n.findAncestor(t.target, "ladi-form");
        isEmptyLadiPage(e) || (e = n.findAncestor(e, "ladi-element"),
        isEmptyLadiPage(e) || window.ladi(e.id).submit())
    }, K = function(t) {
        var e = n.findAncestor(t.target, "ladi-form");
        if (!isEmptyLadiPage(e)) {
            var i = n.findAncestor(e, "ladi-element");
            if (!isEmptyLadiPage(i)) {
                n.setEventDataFormDynamic(i.id);
                var a = n.runtime.eventData[i.id];
                if (!isEmptyLadiPage(a)) {
                    var o = {};
                    if (isObjectLadiPage(a["option.form_setting"]) && a["option.form_setting"].is_multiple) {
                        if (!a["option.form_setting"].is_multiple_otp)
                            return void U(i, a, !0, t.target.getAttribute("name"), {
                                isRunTracking: !0
                            });
                        o.isFormOtp = !0,
                        o.isCapture = !0
                    }
                    if (a["option.form_auto_capture"] && !isEmptyLadiPage(a["option.form_config_id"])) {
                        var r = R(i.id, a["option.form_config_id"]);
                        Y(i, {
                            captcha: !0
                        }, !0, r, t.target.getAttribute("name"), o)
                    }
                }
            }
        }
    }, Q = {};
    S.forEach(function(t) {
        Q[t] = window.ladi("_ladipage_" + t).get_cookie(),
        isEmptyLadiPage(e[t]) || (Q[t] = e[t])
    }),
    a = n.runtime.tmp.convertFormDataObjectCountry(Q);
    var V = 0
      , X = !1
      , z = function(t) {
        for (var e = d[V].querySelectorAll('.ladi-element .ladi-form-item-container [name="' + t + '"]'), i = null, o = 0; o < e.length; o++) {
            var r = Q[t];
            if (!isEmptyLadiPage(r) && "none" != getComputedStyle(e[o]).display)
                if ("true" != e[o].getAttribute("data-is-select-country") && (r = a[t]),
                "SELECT" == e[o].tagName)
                    e[o].querySelectorAll('option[value="' + r + '"]').length > 0 && (e[o].value = r,
                    X && n.fireEvent(e[o], "change"));
                else {
                    if ("country" == t && "true" == e[o].getAttribute("data-is-select-country"))
                        continue;
                    "INPUT" == e[o].tagName && "true" == e[o].getAttribute("data-is-select-country") && 2 == (i = r.split(":")).length && (r = i[1]),
                    e[o].value = r,
                    X && n.fireEvent(e[o], "change")
                }
        }
    }
      , Z = function(t) {
        t.target.type = "date",
        t.target.focus()
    }
      , $ = function(t) {
        isEmptyLadiPage(t.target.value) && (t.target.type = "text")
    };
    for (V = 0; V < d.length; V++) {
        d[V].onsubmit = H;
        for (var tt = n.findAncestor(d[V], "ladi-element"), et = d[V].getElementsByClassName("ladi-button"), it = 0; it < et.length; it++) {
            var at = d[V].getElementsByClassName("ladi-button")[it];
            if (!isEmptyLadiPage(at)) {
                var nt = n.findAncestor(at, "ladi-element");
                isEmptyLadiPage(tt) || isEmptyLadiPage(n.runtime.eventData[tt.id]) || !n.runtime.eventData[tt.id]["option.is_add_to_cart"] ? nt.addEventListener("click", J) : (nt.setAttribute("data-click", !1),
                nt.addEventListener("click", W))
            }
        }
        var ot = d[V].querySelector('[data-is-select-country="true"][name="country"]');
        if (!isEmptyLadiPage(ot) && "true" == ot.getAttribute("data-no-ward")) {
            var rt = d[V].querySelector('[data-is-select-country="true"][name="ward"]');
            isEmptyLadiPage(rt) || rt.removeAttribute("required")
        }
        for (var dt = d[V].querySelectorAll('input[data-type="date"]'), ct = 0; ct < dt.length; ct++)
            isEmptyLadiPage(dt[ct].getAttribute("placeholder")) || (dt[ct].setAttribute("data-event", !0),
            n.runtime.isDesktop || n.runtime.isBrowserDesktop ? (dt[ct].setAttribute("type", "text"),
            dt[ct].addEventListener("focus", Z),
            dt[ct].addEventListener("blur", $)) : dt[ct].value = (new Date).toISOString().substr(0, 10));
        var st = d[V].querySelectorAll("[tabindex]")
          , ut = 0
          , pt = 0;
        for (ct = 0; ct < st.length; ct++)
            (pt = parseInt(st[ct].getAttribute("tabindex")) || 0) > ut && (ut = pt),
            st[ct].setAttribute("tabindex", n.runtime.tabindexForm + pt);
        for (st = d[V].querySelectorAll("[data-tabindex]"),
        ct = 0; ct < st.length; ct++)
            (pt = parseInt(st[ct].getAttribute("data-tabindex")) || 0) > ut && (ut = pt),
            st[ct].setAttribute("data-tabindex", n.runtime.tabindexForm + pt);
        n.runtime.tabindexForm += ut;
        for (var lt = 0; lt < D.length; lt++) {
            var mt = d[V].querySelector('.ladi-element .ladi-form-item-container input[name="' + D[lt] + '"]');
            isEmptyLadiPage(mt) || mt.addEventListener("focusout", K)
        }
    }
    var _t = function(t, e) {
        for (X = e,
        V = 0; V < d.length; V++) {
            var i = n.findAncestor(d[V], "ladi-element");
            !isEmptyLadiPage(n.runtime.eventData[i.id]) && n.runtime.eventData[i.id]["option.form_auto_complete"] && t.forEach(z)
        }
    };
    _t(n.copy(S).except(n.runtime.list_set_value_name_country));
    LadiPageLocation.push(function() {
        var t = ""
          , e = ""
          , i = ""
          , a = ""
          , o = null
          , r = function(t, e) {
            var i = String(o[t].name)
              , a = String(o[e].name);
            try {
                return i.localeCompare(a)
            } catch (t) {}
            return i == a ? 0 : i > a ? 1 : -1
        }
          , c = function(i) {
            var a = window.LadiLocation[e];
            if (isObjectLadiPage(a)) {
                var n = a.data[i];
                isEmptyLadiPage(n) || (t += '<option value="' + n.id + ":" + n.name + '">' + n.name + "</option>")
            }
        }
          , s = function(t) {
            var e = window.LadiLocation[t.target.getAttribute("data-country")];
            if (isObjectLadiPage(e)) {
                var a = e.data[t.target.value.split(":")[0]];
                if (i = "",
                !isEmptyLadiPage(a) && isObjectLadiPage(a.data)) {
                    var d = Object.keys(a.data);
                    o = a.data,
                    d.sort(r),
                    d.forEach(function(t) {
                        var e = a.data[t];
                        i += '<option value="' + e.id + ":" + e.name + '">' + e.name + "</option>"
                    })
                }
                var c = n.findAncestor(t.target, "ladi-element");
                if (!isEmptyLadiPage(c)) {
                    var s = c.querySelector('[name="district"]');
                    isEmptyLadiPage(s) || "SELECT" == s.tagName && (s.setAttribute("data-selected", ""),
                    s.innerHTML = s.querySelector("option").outerHTML + i);
                    var u = c.querySelector('[name="ward"]');
                    isEmptyLadiPage(u) || "SELECT" == u.tagName && (u.setAttribute("data-selected", ""),
                    u.innerHTML = u.querySelector("option").outerHTML),
                    LadiPageShopping.push(function() {
                        n.reloadFeeShipping({
                            target: u
                        })
                    })
                }
            }
        }
          , u = function(t) {
            var e = n.findAncestor(t.target, "ladi-element");
            if (!isEmptyLadiPage(e)) {
                var i = e.querySelector('[name="ward"]');
                if (!isEmptyLadiPage(i)) {
                    a = "";
                    var d = e.querySelector('select[name="state"]');
                    if (!isEmptyLadiPage(d)) {
                        var c = d.getAttribute("data-selected");
                        if (!isEmptyLadiPage(c)) {
                            c = c.split(":")[0];
                            var s = window.LadiLocation[d.getAttribute("data-country")];
                            if (isObjectLadiPage(s)) {
                                var u = s.data[c];
                                if (!isEmptyLadiPage(u) && isObjectLadiPage(u.data)) {
                                    var p = u.data[t.target.value.split(":")[0]];
                                    if (!isEmptyLadiPage(p)) {
                                        var l = Object.keys(p.data);
                                        o = p.data,
                                        l.sort(r),
                                        l.forEach(function(t) {
                                            var e = p.data[t];
                                            a += '<option value="' + e.id + ":" + e.name + '">' + e.name + "</option>"
                                        })
                                    }
                                }
                            }
                        }
                    }
                    "SELECT" == i.tagName && (i.setAttribute("data-selected", ""),
                    i.innerHTML = i.querySelector("option").outerHTML + a);
                    var m = e.querySelector('[name="district"]');
                    isEmptyLadiPage(m) || "SELECT" != m.tagName || LadiPageShopping.push(function() {
                        n.reloadFeeShipping({
                            target: i
                        })
                    })
                }
            }
        }
          , p = function(t) {
            var e = n.findAncestor(t.target, "ladi-element");
            if (!isEmptyLadiPage(e)) {
                var i = e.querySelector('[name="ward"]');
                isEmptyLadiPage(i) || "SELECT" != i.tagName || LadiPageShopping.push(function() {
                    n.reloadFeeShipping()
                })
            }
        };
        for (V = 0; V < d.length; V++) {
            var l = d[V].querySelectorAll('.ladi-element .ladi-form-item-container [name="state"]')
              , m = 0
              , _ = null;
            for (m = 0; m < l.length; m++)
                if (_ = n.findAncestor(l[m], "ladi-element"),
                !isEmptyLadiPage(_) && (e = n.runtime.eventData[_.id]["option.input_country"],
                !isEmptyLadiPage(e) && (t = "",
                e = e.split(":")[0],
                isObjectLadiPage(window.LadiLocation[e])))) {
                    var g = window.LadiLocation[e].data
                      , f = Object.keys(g);
                    o = g,
                    f.sort(r),
                    isArrayLadiPage(n.runtime.country_state_sort[e]) && (f = f.except(n.runtime.country_state_sort[e]),
                    f = n.runtime.country_state_sort[e].concat(f)),
                    f.forEach(c),
                    l[m].setAttribute("data-country", e),
                    l[m].innerHTML = l[m].querySelector("option").outerHTML + t,
                    l[m].removeEventListener("change", s),
                    l[m].addEventListener("change", s)
                }
            var y = d[V].querySelectorAll('.ladi-element .ladi-form-item-container [name="district"]');
            for (m = 0; m < y.length; m++)
                y[m].removeEventListener("change", u),
                y[m].addEventListener("change", u);
            var h = d[V].querySelectorAll('.ladi-element .ladi-form-item-container [name="ward"]');
            for (m = 0; m < h.length; m++)
                h[m].removeEventListener("change", p),
                h[m].addEventListener("change", p)
        }
    }),
    LadiPageLocation.push(function() {
        _t(C, !0)
    }),
    n.runtime.tmp.buttonAddToCartClick = B
}
,
LadiPageScriptV2.prototype.setEventDataFormDynamic = function(t) {
    var e = this
      , i = function() {
        var t = e.runtime.tmp.form_data_dynamic;
        if (isNullLadiPage(t))
            try {
                var i = document.getElementById("script_form_data_dynamic");
                isEmptyLadiPage(i) || (t = JSON.parse(i.innerHTML),
                t = e.deOptimizeEventData(t, LadiPageScript.const.OPTIMIZE_EVENT_DATA_KEY_LIST, "OPTIMIZE_EVENT_DATA_KEY_LIST"),
                e.runtime.tmp.form_data_dynamic = t)
            } catch (t) {}
        return t
    }();
    if (isArrayLadiPage(i) && i.length > 0) {
        var a = "event_data_" + t;
        isNullLadiPage(e.runtime.tmp[a]) && isObjectLadiPage(e.runtime.eventData[t]) && (e.runtime.tmp[a] = e.copy(e.runtime.eventData[t]));
        var n = isObjectLadiPage(e.runtime.tmp[a]) ? e.copy(e.runtime.tmp[a]) : e.runtime.eventData[t]
          , o = !0
          , r = function(t, e, i) {
            var a = !1;
            "NOT_CONTAINS" != e && "NOT_STARTS_WITH" != e && "NOT_ENDS_WITH" != e && "!=" != e && "NOT_IN" != e || (a = !0);
            var n = isEmptyLadiPage(i) ? "" : i;
            n = (n = isStringLadiPage(n) ? n : String(n)).toLowerCase();
            for (var o = 0 == i ? 0 : parseFloatLadiPage(i) || null, r = 0; r < t.length; r++) {
                var d = isEmptyLadiPage(t[r]) ? "" : t[r];
                d = (d = isStringLadiPage(d) ? d : String(d)).toLowerCase();
                var c = 0 == t[r] ? 0 : parseFloatLadiPage(t[r]) || null;
                if ("CONTAINS" == e && -1 != n.indexOf(d)) {
                    a = !0;
                    break
                }
                if ("NOT_CONTAINS" == e && -1 != n.indexOf(d)) {
                    a = !1;
                    break
                }
                if ("STARTS_WITH" == e && n.startsWith(d)) {
                    a = !0;
                    break
                }
                if ("NOT_STARTS_WITH" == e && n.startsWith(d)) {
                    a = !1;
                    break
                }
                if ("ENDS_WITH" == e && n.endsWith(d)) {
                    a = !0;
                    break
                }
                if ("NOT_ENDS_WITH" == e && n.endsWith(d)) {
                    a = !1;
                    break
                }
                if (("=" == e || "IN" == e) && n == d) {
                    a = !0;
                    break
                }
                if (("!=" == e || "NOT_IN" == e) && n == d) {
                    a = !1;
                    break
                }
                if (!isEmptyLadiPage(c) && !isEmptyLadiPage(o)) {
                    if (">" == e && o > c) {
                        a = !0;
                        break
                    }
                    if (">=" == e && o >= c) {
                        a = !0;
                        break
                    }
                    if ("<" == e && o < c) {
                        a = !0;
                        break
                    }
                    if ("<=" == e && o <= c) {
                        a = !0;
                        break
                    }
                }
            }
            return a
        }
          , d = function(i) {
            if (o)
                try {
                    var a = null;
                    "FORM_ITEM" == i.type && ("id" == i.form_item_type && (a = document.querySelector("#" + t + ' > .ladi-form > .ladi-element[id="' + i.form_item_value + '"]')),
                    "name" == i.form_item_type && (a = document.querySelector("#" + t + ' > .ladi-form > .ladi-element [name="' + i.form_item_value + '"]'),
                    a = e.findAncestor(a, "ladi-element")),
                    o = !isEmptyLadiPage(a) && r(i.value, i.operator, window.ladi(a.id).value())),
                    "FORM" == i.type && (o = r(i.value, i.operator, t))
                } catch (t) {
                    o = !1
                }
        };
        i.forEach(function(t) {
            isObjectLadiPage(t.form_data) && (o = !0,
            isArrayLadiPage(t.conditions) && t.conditions.forEach(d),
            o && (n = e.copy(t.form_data)))
        }),
        e.runtime.eventData[t] = n
    }
}
,
LadiPageScriptV2.prototype.setInputOtp = function() {
    for (var t = this, e = document.querySelectorAll(".ladi-form .ladi-element .ladi-form-otp"), i = function(e, a) {
        var n = t.findAncestor(a, "ladi-form");
        if (!isEmptyLadiPage(n) && (n = t.findAncestor(n, "ladi-element"),
        !isEmptyLadiPage(n))) {
            var o = "_otp_time_" + n.id
              , r = window.ladi(o).get_cookie()
              , d = t.runtime.tmp["cookie_cache_otp_" + n.id];
            isEmptyLadiPage(r) && isObjectLadiPage(d) && !isEmptyLadiPage(d[o]) && (r = d[o]);
            var c = (r = parseFloatLadiPage(r) || 0) + t.runtime.time_otp - Date.now();
            c = c < t.runtime.time_otp ? c : 0,
            r <= 0 || c <= 0 ? function(t) {
                t.classList.add("otp-resend"),
                t.classList.remove("otp-countdown"),
                t.removeAttribute("data-countdown-time")
            }(e) : (c = Math.ceil(c / 1e3),
            e.classList.remove("otp-resend"),
            e.classList.add("otp-countdown"),
            e.setAttribute("data-countdown-time", c),
            t.runTimeout(function() {
                i(e, a)
            }, 1e3))
        }
    }, a = function(e) {
        var a = t.findAncestor(e.target, "ladi-form");
        if (!isEmptyLadiPage(a) && (a = t.findAncestor(a, "ladi-element"),
        !isEmptyLadiPage(a))) {
            var n = "_otp_time_" + a.id
              , o = !1
              , r = t.runtime.tmp["cookie_cache_otp_" + a.id]
              , d = function() {
                a.removeAttribute("data-start-countdown-otp");
                var d = new Date;
                d.setTime(d.getTime() + t.runtime.time_otp),
                o ? (r[n] = Date.now(),
                t.runtime.tmp["cookie_cache_otp_" + a.id] = r) : window.ladi(n).set_cookie(Date.now(), d);
                var c = t.findAncestor(e.target, "ladi-form-item");
                t.runTimeout(function() {
                    i(c, e.target)
                }, 1)
            };
            if ("true" != a.getAttribute("data-start-countdown-otp")) {
                var c = window.ladi(n).get_cookie();
                isEmptyLadiPage(c) && isObjectLadiPage(r) && !isEmptyLadiPage(r[n]) && (c = r[n],
                o = !0);
                var s = (c = parseFloatLadiPage(c) || 0) + t.runtime.time_otp - Date.now();
                s = s < t.runtime.time_otp ? s : 0,
                (c <= 0 || s <= 0) && "true" != e.target.getAttribute("data-click") && isFunctionLadiPage(t.runtime.func_get_code_otp[a.id]) && (t.removeTimeout(t.runtime.tmp.timeout_is_wait_popup_id),
                t.runtime.tmp.is_wait_popup = !0,
                t.showLoadingBlur(),
                e.target.setAttribute("data-click", !0),
                t.runtime.func_get_code_otp[a.id](!0, function(i) {
                    e.target.removeAttribute("data-click"),
                    t.hideLoadingBlur(),
                    i && d(),
                    t.runtime.tmp.timeout_is_wait_popup_id = t.runTimeout(function() {
                        delete t.runtime.tmp.is_wait_popup
                    }, 200)
                }))
            } else
                d()
        }
    }, n = 0; n < e.length; n++) {
        var o = e[n]
          , r = t.findAncestor(o, "ladi-form-item");
        if (!isEmptyLadiPage(r)) {
            r.classList.add("overflow-hidden");
            var d = r.getElementsByClassName("button-get-code")[0];
            isEmptyLadiPage(d) && ((d = document.createElement("div")).className = "button-get-code",
            d.innerHTML = t.const.LANG.GET_CODE_BUTTON_TEXT,
            d.addEventListener("click", a),
            r.appendChild(d)),
            d.classList.add("hide-visibility"),
            o.style.setProperty("padding-right", d.clientWidth + 5 + "px"),
            d.classList.remove("hide-visibility"),
            i(r, d)
        }
    }
}
,
LadiPageScriptV2.prototype.setInputFile = function() {
    for (var t = this, e = document.querySelectorAll(".ladi-form .ladi-element .ladi-form-control-file"), i = function(e) {
        var i = e.target
          , a = i.getAttribute("data-click-id") || t.randomId();
        i.setAttribute("data-click-id", a);
        var n = document.getElementById("ladi-input-file");
        if (isEmptyLadiPage(n)) {
            (n = document.createElement("input")).id = "ladi-input-file";
            var o = t.findAncestor(i, "ladi-element");
            !isEmptyLadiPage(o) && o.classList.contains("accept-all") || n.setAttribute("accept", ".jpg, .jpeg, .png, .gif, .svg, .ico, .mp3, .mp4, .ttf, .otf, .woff2, .txt, .doc, .docx, .xls, .xlsx, .pdf"),
            n.setAttribute("style", "position: absolute; top: 0; left: 0; visibility: hidden;"),
            n.multiple = !0,
            n.type = "file",
            document.body.appendChild(n)
        }
        n.setAttribute("data-file-click-id", a),
        "true" != n.getAttribute("data-event") && (n.setAttribute("data-event", !0),
        n.addEventListener("change", function(e) {
            !function(e, i, a) {
                if (i.length > t.const.FORM_UPLOAD_FILE_LENGTH)
                    t.showMessage(t.const.LANG.FORM_UPLOAD_FILE_MAX_LENGTH_ERROR, {
                        max_length: t.const.FORM_UPLOAD_FILE_LENGTH
                    });
                else {
                    for (var n = new FormData, o = 0, r = 0; r < i.length; r++)
                        o += i[r].size,
                        n.append("file[]", i[r]);
                    if (o > 1024 * t.const.FORM_UPLOAD_FILE_SIZE * 1024)
                        t.showMessage(t.const.LANG.FORM_UPLOAD_FILE_MAX_SIZE_ERROR, {
                            max_size: t.const.FORM_UPLOAD_FILE_SIZE
                        });
                    else {
                        var d = {
                            ladipage_id: t.runtime.ladipage_id,
                            lang: t.runtime.lang
                        };
                        n.append("json_data", JSON.stringify(d)),
                        t.showLoadingBlur(),
                        t.sendRequest("POST", t.const.API_FILE_UPLOAD, n, !0, null, function(i, a, n) {
                            if (n.readyState == XMLHttpRequest.DONE) {
                                if (t.hideLoadingBlur(),
                                200 == a)
                                    try {
                                        var o = JSON.parse(i);
                                        if (200 == o.code) {
                                            var r = []
                                              , d = [];
                                            return o.data.success.forEach(function(t) {
                                                r.push(t.name),
                                                d.push({
                                                    id: t._id,
                                                    path: t.path,
                                                    name: t.name
                                                })
                                            }),
                                            e.value = r.length > 0 ? "[" + r.join(", ") + "]" : "",
                                            void e.setAttribute("data-path-file", JSON.stringify(d))
                                        }
                                        if (!isEmptyLadiPage(o.message))
                                            return void t.showMessage(o.message)
                                    } catch (t) {}
                                t.showMessage(t.const.LANG.REQUEST_SEND_ERROR)
                            }
                        }),
                        isFunctionLadiPage(a) && a()
                    }
                }
            }(i = document.querySelector('[data-click-id="' + e.target.getAttribute("data-file-click-id") + '"]'), e.target.files, function() {
                e.target.value = null
            })
        })),
        n.click()
    }, a = 0; a < e.length; a++) {
        var n = e[a];
        n.readOnly = !0,
        n.style.setProperty("cursor", "pointer"),
        n.addEventListener("click", i)
    }
}
,
LadiPageScriptV2.prototype.runFormItem = function(t, e, i) {
    var a = this;
    if ("form_item" == e) {
        var n = null
          , o = null;
        if ((i == a.const.INPUT_TYPE.select || i == a.const.INPUT_TYPE.select_multiple) && (n = document.getElementById(t),
        !isEmptyLadiPage(n)))
            for (var r = n.getElementsByClassName("ladi-form-control"), d = 0; d < r.length; d++)
                r[d].addEventListener("change", function(t) {
                    t.target.setAttribute("data-selected", t.target.value)
                });
        if (i == a.const.INPUT_TYPE.radio || i == a.const.INPUT_TYPE.checkbox) {
            n = document.getElementById(t);
            var c = function(t) {
                t.stopPropagation();
                var e = a.findAncestor(t.target, "ladi-form-checkbox-item");
                if (!isEmptyLadiPage(e)) {
                    if (i == a.const.INPUT_TYPE.radio) {
                        var n = a.findAncestor(e, "ladi-form-checkbox");
                        if (!isEmptyLadiPage(n))
                            for (var o = n.querySelectorAll(".ladi-form-checkbox-item span"), r = 0; r < o.length; r++)
                                o[r].setAttribute("data-checked", !1)
                    }
                    e.getElementsByTagName("span")[0].setAttribute("data-checked", t.target.checked)
                }
                a.runFormItemOtherChange(e)
            }
              , s = function(t) {
                t.stopPropagation();
                var e = a.findAncestor(t.target, "ladi-form-checkbox-item");
                isEmptyLadiPage(e) || e.getElementsByTagName("input")[0].click()
            };
            if (!isEmptyLadiPage(n)) {
                o = n.getElementsByClassName("ladi-form-checkbox-item");
                for (var u = 0; u < o.length; u++) {
                    var p = o[u].getElementsByTagName("input")[0];
                    o[u].getElementsByTagName("span")[0].addEventListener("click", s),
                    p.addEventListener("change", c)
                }
                a.runFormItemOtherChange(o[0])
            }
        }
    }
}
,
LadiPageScriptV2.prototype.runFormData = function(t) {
    isFunctionLadiPage(t) && t()
}
,
function() {
    var t = window.LadiPageFormData || [];
    window.LadiPageFormData = {},
    window.LadiPageFormData.push = function(t) {
        LadiPageScript.runFormData(t)
    }
    ,
    t.forEach(function(t) {
        window.LadiPageFormData.push(t)
    })
}();
