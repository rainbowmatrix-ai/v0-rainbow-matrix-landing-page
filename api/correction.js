{
    "name": "Username-Correction-v1",
    "flow": [
        {
            "id": 1,
            "module": "gateway:CustomWebHook",
            "version": 1,
            "parameters": {
                "hook": 2294855,
                "maxResults": 1
            },
            "mapper": {},
            "metadata": {
                "designer": {
                    "x": 0,
                    "y": 0,
                    "name": "Correction Form Receiver"
                },
                "restore": {
                    "parameters": {
                        "hook": {
                            "data": { "editable": "true" },
                            "label": "username_correction_form"
                        }
                    }
                },
                "parameters": [
                    { "name": "hook", "type": "hook:gateway-webhook", "label": "Webhook", "required": true },
                    { "name": "maxResults", "type": "number", "label": "Maximum number of results" }
                ]
            }
        },
        {
            "id": 2,
            "module": "datastore:GetRecord",
            "version": 1,
            "parameters": { "datastore": 98882 },
            "mapper": { "key": "tv_session_cookies", "returnWrapped": false },
            "metadata": {
                "designer": { "x": 300, "y": 0 },
                "restore": {
                    "expect": { "returnWrapped": { "collapsed": true } },
                    "parameters": { "datastore": { "label": "RB_Secrets" } }
                },
                "parameters": [
                    { "name": "datastore", "type": "datastore", "label": "Data store", "required": true }
                ],
                "expect": [
                    { "name": "key", "type": "text", "label": "Key", "required": true },
                    { "name": "returnWrapped", "type": "boolean", "label": "Return Wrapped Output", "required": true }
                ]
            }
        },
        {
            "id": 3,
            "module": "datastore:GetRecord",
            "version": 1,
            "parameters": { "datastore": 98882 },
            "mapper": { "key": "elite_pine_id", "returnWrapped": false },
            "metadata": {
                "designer": { "x": 600, "y": 0 },
                "restore": {
                    "expect": { "returnWrapped": { "collapsed": true } },
                    "parameters": { "datastore": { "label": "RB_Secrets" } }
                },
                "parameters": [
                    { "name": "datastore", "type": "datastore", "label": "Data store", "required": true }
                ],
                "expect": [
                    { "name": "key", "type": "text", "label": "Key", "required": true },
                    { "name": "returnWrapped", "type": "boolean", "label": "Return Wrapped Output", "required": true }
                ]
            }
        },
        {
            "id": 4,
            "module": "datastore:GetRecord",
            "version": 1,
            "parameters": { "datastore": 98882 },
            "mapper": { "key": "tv_referer_url", "returnWrapped": false },
            "metadata": {
                "designer": { "x": 900, "y": 0 },
                "restore": {
                    "expect": { "returnWrapped": { "collapsed": true } },
                    "parameters": { "datastore": { "label": "RB_Secrets" } }
                },
                "parameters": [
                    { "name": "datastore", "type": "datastore", "label": "Data store", "required": true }
                ],
                "expect": [
                    { "name": "key", "type": "text", "label": "Key", "required": true },
                    { "name": "returnWrapped", "type": "boolean", "label": "Return Wrapped Output", "required": true }
                ]
            }
        },
        {
            "id": 5,
            "module": "util:SetVariables",
            "version": 1,
            "parameters": {},
            "mapper": {
                "scope": "roundtrip",
                "variables": [
                    { "name": "tv_session_cookies", "value": "{{2.secret_value}}" },
                    { "name": "elite_pine_id", "value": "{{3.secret_value}}" },
                    { "name": "tv_referer_url", "value": "{{4.secret_value}}" },
                    { "name": "email_normalized", "value": "{{lower(trim(1.email))}}" },
                    { "name": "tv_username_clean", "value": "{{lower(trim(replace(replace(replace(replace(replace(1.tv_username; \" \"; \"\"); \"@\"; \"\"); \"/\"; \"\"); \".\"; \"\"); \",\"; \"\")))}}" }
                ]
            },
            "metadata": {
                "designer": { "x": 1200, "y": 0 },
                "restore": {
                    "expect": {
                        "scope": { "label": "One cycle" },
                        "variables": { "items": [null, null, null, null, null] }
                    }
                },
                "expect": [
                    {
                        "name": "variables",
                        "spec": [
                            { "name": "name", "type": "text", "label": "Variable name", "required": true },
                            { "name": "value", "type": "any", "label": "Variable value" }
                        ],
                        "type": "array",
                        "label": "Variables"
                    },
                    {
                        "name": "scope",
                        "type": "select",
                        "label": "Variable lifetime",
                        "required": true,
                        "validate": { "enum": ["roundtrip", "execution"] }
                    }
                ],
                "interface": [
                    { "name": "tv_session_cookies", "type": "any", "label": "tv_session_cookies" },
                    { "name": "elite_pine_id", "type": "any", "label": "elite_pine_id" },
                    { "name": "tv_referer_url", "type": "any", "label": "tv_referer_url" },
                    { "name": "email_normalized", "type": "any", "label": "email_normalized" },
                    { "name": "tv_username_clean", "type": "any", "label": "tv_username_clean" }
                ]
            }
        },
        {
            "id": 6,
            "module": "google-sheets:filterRows",
            "version": 2,
            "parameters": { "__IMTCONN__": 8821770 },
            "mapper": {
                "from": "drive",
                "limit": "1",
                "filter": [
                    [
                        { "a": "D", "b": "{{5.email_normalized}}", "o": "text:equal" },
                        { "a": "M", "b": "error_username_not_found", "o": "text:equal" }
                    ]
                ],
                "orderBy": "A",
                "sheetId": "Página1",
                "fieldType": "date",
                "sortOrder": "desc",
                "spreadsheetId": "1dYTAjksYXniocJEZedDCJBGD0lJ2G_gBuHuNNG8Qc18",
                "tableFirstRow": "A1:CZ1",
                "includesHeaders": true,
                "valueRenderOption": "FORMATTED_VALUE",
                "dateTimeRenderOption": "FORMATTED_STRING"
            },
            "metadata": {
                "designer": { "x": 1500, "y": 0 },
                "restore": {
                    "expect": {
                        "from": { "label": "Select from My Drive" },
                        "orderBy": { "mode": "chose", "label": "timestamp (A)" },
                        "sheetId": { "mode": "chose", "label": "Página1" },
                        "fieldType": { "mode": "chose", "label": "Date" },
                        "sortOrder": { "mode": "chose", "label": "Descending" },
                        "spreadsheetId": { "mode": "chose", "label": "Pipeline" },
                        "tableFirstRow": { "label": "A-CZ" },
                        "includesHeaders": { "mode": "chose", "label": "Yes" },
                        "valueRenderOption": { "mode": "chose", "label": "Formatted value" },
                        "dateTimeRenderOption": { "mode": "chose", "label": "Formatted string" }
                    },
                    "parameters": {
                        "__IMTCONN__": {
                            "data": { "scoped": "true", "connection": "google" },
                            "label": "Pipeline Planilha Google (google@guitavares.com.br)"
                        }
                    }
                },
                "parameters": [
                    { "name": "__IMTCONN__", "type": "account:google", "label": "Connection", "required": true }
                ],
                "expect": [
                    { "name": "from", "type": "select", "label": "Search Method", "required": true, "validate": { "enum": ["drive", "share"] } },
                    { "name": "valueRenderOption", "type": "select", "label": "Value render option", "validate": { "enum": ["FORMATTED_VALUE", "UNFORMATTED_VALUE", "FORMULA"] } },
                    { "name": "dateTimeRenderOption", "type": "select", "label": "Date and time render option", "validate": { "enum": ["SERIAL_NUMBER", "FORMATTED_STRING"] } },
                    { "name": "limit", "type": "uinteger", "label": "Limit" },
                    { "name": "spreadsheetId", "type": "select", "label": "Spreadsheet Name", "required": true },
                    { "name": "sheetId", "type": "select", "label": "Sheet Name", "required": true },
                    { "name": "includesHeaders", "type": "select", "label": "Table contains headers", "required": true, "validate": { "enum": [true, false] } },
                    { "name": "tableFirstRow", "type": "select", "label": "Column range", "required": true },
                    { "name": "filter", "type": "filter", "label": "Filter" },
                    { "name": "orderBy", "type": "select", "label": "Order by" },
                    { "name": "sortOrder", "type": "select", "label": "Sort order", "validate": { "enum": ["asc", "desc"] } },
                    { "name": "fieldType", "type": "select", "label": "Field Type", "validate": { "enum": ["string", "number", "date"] } }
                ]
            }
        },
        {
            "id": 7,
            "module": "builtin:BasicAggregator",
            "version": 1,
            "parameters": { "feeder": 6 },
            "mapper": {
                "value": {
                    "timestamp": "{{6.`0`}}",
                    "event_type": "{{6.`1`}}",
                    "whop_user_id": "{{6.`2`}}",
                    "customer_email": "{{6.`3`}}",
                    "customer_name": "{{6.`4`}}",
                    "billing_name_raw": "{{6.`5`}}",
                    "tv_username_old": "{{6.`6`}}",
                    "membership_id": "{{6.`7`}}",
                    "plan_id": "{{6.`8`}}",
                    "status": "{{6.`9`}}",
                    "valid_until": "{{6.`10`}}",
                    "promo_code": "{{6.`11`}}"
                }
            },
            "metadata": {
                "designer": { "x": 1800, "y": 0, "name": "Aggregate Search Results" },
                "restore": {
                    "extra": {
                        "target": { "label": "Custom" },
                        "feeder": { "label": "Google Sheets - Search Rows [6]" }
                    }
                },
                "expect": [
                    {
                        "name": "value",
                        "spec": [
                            { "name": "timestamp", "type": "text", "label": "timestamp" },
                            { "name": "event_type", "type": "text", "label": "event_type" },
                            { "name": "whop_user_id", "type": "text", "label": "whop_user_id" },
                            { "name": "customer_email", "type": "text", "label": "customer_email" },
                            { "name": "customer_name", "type": "text", "label": "customer_name" },
                            { "name": "billing_name_raw", "type": "text", "label": "billing_name_raw" },
                            { "name": "tv_username_old", "type": "text", "label": "tv_username_old" },
                            { "name": "membership_id", "type": "text", "label": "membership_id" },
                            { "name": "plan_id", "type": "text", "label": "plan_id" },
                            { "name": "status", "type": "text", "label": "status" },
                            { "name": "valid_until", "type": "text", "label": "valid_until" },
                            { "name": "promo_code", "type": "text", "label": "promo_code" }
                        ],
                        "type": "collection",
                        "label": "Item"
                    }
                ]
            }
        },
        {
            "id": 8,
            "module": "builtin:BasicRouter",
            "version": 1,
            "mapper": null,
            "metadata": { "designer": { "x": 2100, "y": 0 } },
            "routes": [
                {
                    "flow": [
                        {
                            "id": 9,
                            "module": "http:MakeRequest",
                            "version": 4,
                            "parameters": {
                                "tlsType": "",
                                "proxyKeychain": "",
                                "authenticationType": "noAuth"
                            },
                            "filter": {
                                "name": "A — Customer Found (Apply Correction)",
                                "conditions": [
                                    [
                                        { "a": "{{length(7.array)}}", "b": "0", "o": "number:greater" }
                                    ]
                                ]
                            },
                            "mapper": {
                                "url": "https://www.tradingview.com/pine_perm/add/",
                                "method": "post",
                                "headers": [
                                    { "name": "Origin", "value": "https://www.tradingview.com" },
                                    { "name": "Referer", "value": "{{5.tv_referer_url}}" },
                                    { "name": "Cookie", "value": "{{5.tv_session_cookies}}" },
                                    { "name": "X-Requested-With", "value": "XMLHttpRequest" }
                                ],
                                "contentType": "multipart",
                                "shareCookies": false,
                                "parseResponse": true,
                                "allowRedirects": true,
                                "stopOnHttpError": true,
                                "multipartBodyContent": [
                                    { "name": "pine_id", "value": "{{5.elite_pine_id}}", "multipartFieldType": "text" },
                                    { "name": "username_recip", "value": "{{5.tv_username_clean}}", "multipartFieldType": "text" },
                                    { "name": "expiration", "value": "{{7.array[1].valid_until}}", "multipartFieldType": "text" }
                                ],
                                "requestCompressedContent": true
                            },
                            "metadata": {
                                "designer": { "x": 2400, "y": -300 },
                                "restore": {
                                    "expect": {
                                        "method": { "mode": "chose", "label": "POST" },
                                        "headers": { "mode": "chose", "items": [null, null, null, null] },
                                        "contentType": { "label": "multipart/form-data" },
                                        "shareCookies": { "mode": "chose" },
                                        "parseResponse": { "mode": "chose" },
                                        "allowRedirects": { "mode": "chose" },
                                        "stopOnHttpError": { "mode": "chose" },
                                        "multipartBodyContent": {
                                            "mode": "chose",
                                            "items": [
                                                { "multipartFieldType": { "mode": "chose", "label": "Text" } },
                                                { "multipartFieldType": { "mode": "chose", "label": "Text" } },
                                                { "multipartFieldType": { "mode": "chose", "label": "Text" } }
                                            ]
                                        },
                                        "requestCompressedContent": { "mode": "chose" }
                                    },
                                    "parameters": {
                                        "authenticationType": { "label": "No authentication" }
                                    }
                                },
                                "parameters": [
                                    { "name": "authenticationType", "type": "select", "label": "Authentication type", "required": true }
                                ],
                                "expect": [
                                    { "name": "url", "type": "url", "label": "URL", "required": true },
                                    { "name": "method", "type": "select", "label": "Method", "required": true },
                                    { "name": "headers", "type": "array", "label": "Headers" },
                                    { "name": "contentType", "type": "select", "label": "Body content type" },
                                    { "name": "parseResponse", "type": "boolean", "label": "Parse response", "required": true },
                                    { "name": "stopOnHttpError", "type": "boolean", "label": "Return error if HTTP request fails", "required": true },
                                    { "name": "allowRedirects", "type": "boolean", "label": "Allow redirects", "required": true },
                                    { "name": "shareCookies", "type": "boolean", "label": "Share cookies with other HTTP modules", "required": true },
                                    { "name": "requestCompressedContent", "type": "boolean", "label": "Request compressed content", "required": true },
                                    { "name": "multipartBodyContent", "type": "array", "label": "Body content", "required": true }
                                ]
                            }
                        },
                        {
                            "id": 10,
                            "module": "google-email:sendAnEmail",
                            "version": 4,
                            "parameters": { "__IMTCONN__": 8821576 },
                            "mapper": {
                                "to": ["{{7.array[1].customer_email}}"],
                                "from": "\"Rainbow Matrix AI\" <contact@rainbowmatrix.ai>",
                                "subject": "✅ Corrected — Elite Access granted, {{5.tv_username_clean}}",
                                "bodyType": "rawHtml",
                                "content": "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n<meta charset=\"UTF-8\">\r\n<title>Correction Resolved</title>\r\n</head>\r\n<body style=\"margin:0;padding:0;background:#0d1117;font-family:'Helvetica Neue',Arial,sans-serif;color:#e8edf2;\">\r\n<div style=\"max-width:600px;margin:0 auto;background:#0d1117;\">\r\n\r\n  <!-- HEADER -->\r\n  <div style=\"padding:32px 30px;border-bottom:1px solid rgba(0,245,212,0.2);text-align:center;\">\r\n    <div style=\"font-size:11px;letter-spacing:0.2em;color:#00f5d4;text-transform:uppercase;margin-bottom:8px;font-family:'Courier New',monospace;\">\r\n      // CORRECTION.RESOLVED\r\n    </div>\r\n    <div style=\"font-size:28px;font-weight:800;color:#e8edf2;line-height:1.2;\">\r\n      🌈 <span style=\"background:linear-gradient(90deg,#00f5d4 0%,#9b5de5 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;\">RAINBOW MATRIX AI</span>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- BODY -->\r\n  <div style=\"padding:36px 30px;\">\r\n    \r\n    <div style=\"font-size:32px;font-weight:800;color:#e8edf2;line-height:1.2;margin-bottom:8px;\">\r\n      Fixed,\r\n    </div>\r\n    <div style=\"font-size:32px;font-weight:800;line-height:1.2;margin-bottom:24px;\">\r\n      <span style=\"color:#00f5d4;\">operator. ✅</span>\r\n    </div>\r\n\r\n    <p style=\"font-size:15px;line-height:1.7;color:#a8b3c0;margin:0 0 24px;\">\r\n      Your TradingView username has been corrected and <strong style=\"color:#e8edf2;\">Elite Access</strong> is now live on your account. The engine is operational.\r\n    </p>\r\n\r\n    <!-- TELEMETRY BLOCK -->\r\n    <div style=\"background:rgba(0,245,212,0.05);border-left:3px solid #00f5d4;padding:22px 26px;margin:28px 0;\">\r\n      <div style=\"font-size:10px;letter-spacing:0.2em;color:#00f5d4;text-transform:uppercase;margin-bottom:14px;font-family:'Courier New',monospace;font-weight:700;\">\r\n        // CORRECTION SUMMARY\r\n      </div>\r\n      <table style=\"width:100%;font-family:'Courier New',monospace;font-size:13px;color:#a8b3c0;line-height:1.8;\">\r\n        <tr>\r\n          <td style=\"padding:4px 0;\">📡 Corrected Username:</td>\r\n          <td style=\"text-align:right;color:#00f5d4;\">{{5.tv_username_clean}}</td>\r\n        </tr>\r\n        <tr>\r\n          <td style=\"padding:4px 0;\">⏳ Access Valid Until:</td>\r\n          <td style=\"text-align:right;color:#00f5d4;\">{{formatDate(7.array[1].valid_until; \"MMM D, YYYY\")}}</td>\r\n        </tr>\r\n        <tr>\r\n          <td style=\"padding:4px 0;\">⚡ Status:</td>\r\n          <td style=\"text-align:right;color:#00f5d4;\">ACCESS GRANTED</td>\r\n        </tr>\r\n      </table>\r\n    </div>\r\n\r\n    <!-- NEXT STEPS -->\r\n    <h2 style=\"font-size:16px;font-weight:800;letter-spacing:0.1em;color:#00f5d4;margin:32px 0 16px;text-transform:uppercase;font-family:'Courier New',monospace;\">\r\n      // NEXT STEPS\r\n    </h2>\r\n\r\n    <p style=\"font-size:14px;line-height:1.7;color:#a8b3c0;margin:0 0 24px;\">\r\n      Go to TradingView → any chart → <strong>Indicators</strong> → <strong>Invite-only scripts</strong> tab → find <strong style=\"color:#e8edf2;\">🌈 Rainbow Matrix AI: Multi-Timeframe Probability Engine</strong> → add to chart.\r\n    </p>\r\n\r\n    <!-- CTA -->\r\n    <div style=\"text-align:center;margin:32px 0;\">\r\n      <a href=\"https://www.tradingview.com/script/xq5CAd4T-Rainbow-Matrix-AI-Multi-Timeframe-Probability-Engine/\" style=\"display:inline-block;background:#00f5d4;color:#0d1117;font-weight:800;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;padding:14px 32px;text-decoration:none;font-family:'Courier New',monospace;\">\r\n        🚀 OPEN ELITE ON TRADINGVIEW →\r\n      </a>\r\n    </div>\r\n\r\n    <p style=\"font-size:13px;line-height:1.7;color:#6b7a8d;margin:32px 0 0;text-align:center;font-style:italic;\">\r\n      Sorry for the friction earlier — glad we got you sorted, operator.<br>\r\n      <span style=\"color:#a8b3c0;\">— The Rainbow Matrix Team</span>\r\n    </p>\r\n  </div>\r\n\r\n  <!-- FOOTER -->\r\n  <div style=\"border-top:1px solid rgba(255,255,255,0.07);padding:24px 30px;text-align:center;\">\r\n    <div style=\"font-size:13px;color:#a8b3c0;line-height:1.8;\">\r\n      <a href=\"https://rainbowmatrix.ai/manual/manual.html\" style=\"color:#00f5d4;text-decoration:none;\">📖 Operator Manual</a> &nbsp;·&nbsp;\r\n      <a href=\"mailto:contact@rainbowmatrix.ai\" style=\"color:#00f5d4;text-decoration:none;\">💬 Support</a>\r\n    </div>\r\n    <div style=\"margin-top:20px;font-size:11px;color:#3d4a57;letter-spacing:0.08em;font-family:'Courier New',monospace;\">\r\n      RAINBOW MATRIX AI · INSTITUTIONAL TACTICAL ENGINE\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n</body>\r\n</html>"
                            },
                            "metadata": {
                                "designer": { "x": 2700, "y": -300 },
                                "restore": {
                                    "expect": {
                                        "cc": { "mode": "chose" },
                                        "to": { "mode": "chose", "items": [null] },
                                        "bcc": { "mode": "chose" },
                                        "from": { "mode": "chose", "label": "\"Rainbow Matrix AI\" <contact@rainbowmatrix.ai>" },
                                        "bodyType": { "label": "Raw HTML" },
                                        "attachments": { "mode": "chose" },
                                        "emailHeaders": { "mode": "chose" }
                                    },
                                    "parameters": {
                                        "__IMTCONN__": {
                                            "data": { "scoped": "true", "connection": "google-email" },
                                            "label": "RainbowMatrix.AI - Gmail (google@guitavares.com.br)"
                                        }
                                    }
                                },
                                "parameters": [
                                    { "name": "__IMTCONN__", "type": "account:google-email", "label": "Connection", "required": true }
                                ],
                                "expect": [
                                    { "name": "to", "type": "array", "label": "To", "required": true },
                                    { "name": "subject", "type": "text", "label": "Subject" },
                                    { "name": "bodyType", "type": "select", "label": "Body type", "required": true },
                                    { "name": "from", "type": "select", "label": "From" },
                                    { "name": "content", "type": "text", "label": "Content" }
                                ]
                            }
                        },
                        {
                            "id": 11,
                            "module": "google-sheets:addRow",
                            "version": 2,
                            "parameters": { "__IMTCONN__": 8821770 },
                            "mapper": {
                                "mode": "fromAll",
                                "values": {
                                    "0": "{{now}}",
                                    "1": "correction.applied",
                                    "2": "{{7.array[1].whop_user_id}}",
                                    "3": "{{7.array[1].customer_email}}",
                                    "4": "{{7.array[1].customer_name}}",
                                    "5": "{{7.array[1].billing_name_raw}}",
                                    "6": "{{5.tv_username_clean}}",
                                    "7": "{{7.array[1].membership_id}}",
                                    "8": "{{7.array[1].plan_id}}",
                                    "9": "{{7.array[1].status}}",
                                    "10": "{{7.array[1].valid_until}}",
                                    "11": "{{7.array[1].promo_code}}",
                                    "12": "success",
                                    "13": "Correction applied — old: '{{7.array[1].tv_username_old}}', new: '{{5.tv_username_clean}}' — source: rainbowmatrix.ai/correction"
                                },
                                "sheetId": "Página1",
                                "spreadsheetId": "1dYTAjksYXniocJEZedDCJBGD0lJ2G_gBuHuNNG8Qc18",
                                "includesHeaders": true,
                                "insertDataOption": "INSERT_ROWS",
                                "useColumnHeaders": false,
                                "valueInputOption": "USER_ENTERED",
                                "insertUnformatted": false
                            },
                            "metadata": {
                                "designer": { "x": 3000, "y": -300 },
                                "restore": {
                                    "expect": {
                                        "mode": { "label": "Select from all" },
                                        "sheetId": { "mode": "chose", "label": "Página1" },
                                        "includesHeaders": { "label": "Yes" },
                                        "insertDataOption": { "mode": "chose", "label": "Insert rows" },
                                        "useColumnHeaders": { "label": "No" },
                                        "valueInputOption": { "mode": "chose", "label": "User entered" },
                                        "insertUnformatted": { "mode": "chose" }
                                    },
                                    "parameters": {
                                        "__IMTCONN__": {
                                            "data": { "scoped": "true", "connection": "google" },
                                            "label": "Pipeline Planilha Google (google@guitavares.com.br)"
                                        }
                                    }
                                },
                                "parameters": [
                                    { "name": "__IMTCONN__", "type": "account:google", "label": "Connection", "required": true }
                                ],
                                "expect": [
                                    { "name": "mode", "type": "select", "label": "Search Method", "required": true },
                                    { "name": "insertUnformatted", "type": "boolean", "label": "Unformatted", "required": true },
                                    { "name": "valueInputOption", "type": "select", "label": "Value input option", "required": true },
                                    { "name": "insertDataOption", "type": "select", "label": "Insert data option" },
                                    { "name": "spreadsheetId", "type": "text", "label": "Spreadsheet ID", "required": true },
                                    { "name": "sheetId", "type": "select", "label": "Sheet Name", "required": true },
                                    { "name": "includesHeaders", "type": "select", "label": "Table contains headers", "required": true },
                                    { "name": "useColumnHeaders", "type": "select", "label": "Use column headers as IDs of the columns", "required": true },
                                    { "name": "values", "type": "collection", "label": "Values in columns" }
                                ]
                            }
                        }
                    ]
                },
                {
                    "flow": [
                        {
                            "id": 12,
                            "module": "google-email:sendAnEmail",
                            "version": 4,
                            "parameters": { "__IMTCONN__": 8821576 },
                            "filter": {
                                "name": "B — Orphan Submission (No Matching Row)",
                                "conditions": [
                                    [
                                        { "a": "{{length(7.array)}}", "b": "0", "o": "number:equal" }
                                    ]
                                ]
                            },
                            "mapper": {
                                "to": ["rainbowmatrix@358dreams.com"],
                                "from": "\"Rainbow Matrix Ops\" <rainbowmatrix@358dreams.com>",
                                "subject": "🟡 [CORRECTION-ORPHAN] {{1.email}} — no matching row",
                                "bodyType": "rawHtml",
                                "content": "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n<meta charset=\"UTF-8\">\r\n<title>[ORPHAN] Correction Submission</title>\r\n</head>\r\n<body style=\"margin:0;padding:0;background:#0d1117;font-family:'Helvetica Neue',Arial,sans-serif;color:#e8edf2;\">\r\n<div style=\"max-width:600px;margin:0 auto;background:#0d1117;\">\r\n\r\n  <!-- HEADER -->\r\n  <div style=\"padding:30px;border-bottom:2px solid #f9c74f;background:rgba(249,199,79,0.05);\">\r\n    <div style=\"font-size:11px;letter-spacing:0.2em;color:#f9c74f;text-transform:uppercase;margin-bottom:6px;font-family:'Courier New',monospace;\">\r\n      // CORRECTION.ORPHAN\r\n    </div>\r\n    <div style=\"font-size:20px;font-weight:800;color:#e8edf2;\">\r\n      🟡 Orphan Correction Submission\r\n    </div>\r\n  </div>\r\n\r\n  <!-- BODY -->\r\n  <div style=\"padding:30px;\">\r\n    \r\n    <p style=\"font-size:14px;line-height:1.7;color:#a8b3c0;margin:0 0 24px;\">\r\n      Someone submitted the correction form, but <strong style=\"color:#f9c74f;\">no matching row was found</strong> with this email AND <code style=\"color:#f9c74f;font-family:'Courier New',monospace;font-size:12px;\">error_username_not_found</code> status. Manual review required.\r\n    </p>\r\n\r\n    <!-- SUBMISSION BLOCK -->\r\n    <div style=\"background:rgba(0,245,212,0.05);border-left:3px solid #00f5d4;padding:18px 22px;margin:20px 0;\">\r\n      <div style=\"font-size:10px;letter-spacing:0.15em;color:#00f5d4;text-transform:uppercase;margin-bottom:10px;font-family:'Courier New',monospace;\">\r\n        // SUBMISSION DATA\r\n      </div>\r\n      <table style=\"width:100%;font-family:'Courier New',monospace;font-size:12px;color:#a8b3c0;\">\r\n        <tr><td style=\"padding:3px 0;\">Email:</td><td style=\"text-align:right;color:#e8edf2;\">{{1.email}}</td></tr>\r\n        <tr><td style=\"padding:3px 0;\">TV Username:</td><td style=\"text-align:right;color:#f9c74f;\">{{1.tv_username}}</td></tr>\r\n        <tr><td style=\"padding:3px 0;\">Whop Order ID:</td><td style=\"text-align:right;color:#e8edf2;\">{{ifempty(1.whop_order_id; \"not provided\")}}</td></tr>\r\n        <tr><td style=\"padding:3px 0;\">Submitted at:</td><td style=\"text-align:right;color:#e8edf2;\">{{1.submitted_at}}</td></tr>\r\n        <tr><td style=\"padding:3px 0;\">Source:</td><td style=\"text-align:right;color:#e8edf2;\">{{1.source}}</td></tr>\r\n      </table>\r\n    </div>\r\n\r\n    <!-- METADATA -->\r\n    <div style=\"background:rgba(249,199,79,0.05);border-left:3px solid #f9c74f;padding:18px 22px;margin:20px 0;\">\r\n      <div style=\"font-size:10px;letter-spacing:0.15em;color:#f9c74f;text-transform:uppercase;margin-bottom:10px;font-family:'Courier New',monospace;\">\r\n        // REQUEST METADATA\r\n      </div>\r\n      <table style=\"width:100%;font-family:'Courier New',monospace;font-size:11px;color:#a8b3c0;\">\r\n        <tr><td style=\"padding:3px 0;vertical-align:top;\">IP:</td><td style=\"text-align:right;color:#a8b3c0;\">{{1.ip}}</td></tr>\r\n        <tr><td style=\"padding:3px 0;vertical-align:top;\">User Agent:</td><td style=\"text-align:right;color:#6b7a8d;font-size:10px;word-break:break-all;\">{{1.user_agent}}</td></tr>\r\n      </table>\r\n    </div>\r\n\r\n    <!-- POSSIBLE CAUSES -->\r\n    <div style=\"background:rgba(155,93,229,0.05);border-left:3px solid #9b5de5;padding:18px 22px;margin:20px 0;\">\r\n      <div style=\"font-size:10px;letter-spacing:0.15em;color:#9b5de5;text-transform:uppercase;margin-bottom:10px;font-family:'Courier New',monospace;\">\r\n        // POSSIBLE CAUSES\r\n      </div>\r\n      <ul style=\"margin:0;padding-left:20px;font-size:13px;color:#a8b3c0;line-height:1.8;\">\r\n        <li>Customer used a different email at Whop checkout</li>\r\n        <li>Customer's row was already corrected previously</li>\r\n        <li>Spam / random form fill (check IP + user agent)</li>\r\n        <li>Customer doesn't have a trial yet (skipped Whop)</li>\r\n      </ul>\r\n    </div>\r\n\r\n    <!-- ACTION -->\r\n    <div style=\"background:rgba(255,255,255,0.03);border-left:2px solid #00f5d4;padding:18px 22px;margin:20px 0;\">\r\n      <div style=\"font-size:10px;letter-spacing:0.15em;color:#00f5d4;text-transform:uppercase;margin-bottom:10px;font-family:'Courier New',monospace;\">\r\n        // RECOMMENDED ACTION\r\n      </div>\r\n      <ol style=\"margin:0;padding-left:20px;font-size:13px;color:#a8b3c0;line-height:1.8;\">\r\n        <li>Search the Pipeline sheet for the email — variations?</li>\r\n        <li>Search Whop dashboard for the email</li>\r\n        <li>If legitimate: grant access manually + reply to customer</li>\r\n        <li>If spam: ignore (logged in sheet as orphan for audit)</li>\r\n      </ol>\r\n    </div>\r\n\r\n  </div>\r\n\r\n  <!-- FOOTER -->\r\n  <div style=\"border-top:1px solid rgba(255,255,255,0.07);padding:18px 30px;text-align:center;\">\r\n    <div style=\"font-size:10px;color:#3d4a57;letter-spacing:0.1em;font-family:'Courier New',monospace;\">\r\n      RB.OPS.ALERT · PRIORITY: MEDIUM · MANUAL REVIEW\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n</body>\r\n</html>"
                            },
                            "metadata": {
                                "designer": { "x": 2400, "y": 300 },
                                "restore": {
                                    "expect": {
                                        "to": { "mode": "chose", "items": [null] },
                                        "from": { "mode": "chose", "label": "\"Rainbow Matrix Ops\" <rainbowmatrix@358dreams.com>" },
                                        "bodyType": { "label": "Raw HTML" }
                                    },
                                    "parameters": {
                                        "__IMTCONN__": {
                                            "data": { "scoped": "true", "connection": "google-email" },
                                            "label": "RainbowMatrix.AI - Gmail (google@guitavares.com.br)"
                                        }
                                    }
                                },
                                "parameters": [
                                    { "name": "__IMTCONN__", "type": "account:google-email", "label": "Connection", "required": true }
                                ],
                                "expect": [
                                    { "name": "to", "type": "array", "label": "To", "required": true },
                                    { "name": "subject", "type": "text", "label": "Subject" },
                                    { "name": "bodyType", "type": "select", "label": "Body type", "required": true },
                                    { "name": "from", "type": "select", "label": "From" },
                                    { "name": "content", "type": "text", "label": "Content" }
                                ]
                            }
                        },
                        {
                            "id": 13,
                            "module": "datastore:GetRecord",
                            "version": 1,
                            "parameters": { "datastore": 98882 },
                            "mapper": { "key": "telegram_chat_id", "returnWrapped": false },
                            "metadata": {
                                "designer": { "x": 2700, "y": 300 },
                                "restore": {
                                    "expect": { "returnWrapped": { "collapsed": true } },
                                    "parameters": { "datastore": { "label": "RB_Secrets" } }
                                },
                                "parameters": [
                                    { "name": "datastore", "type": "datastore", "label": "Data store", "required": true }
                                ],
                                "expect": [
                                    { "name": "key", "type": "text", "label": "Key", "required": true },
                                    { "name": "returnWrapped", "type": "boolean", "label": "Return Wrapped Output", "required": true }
                                ]
                            }
                        },
                        {
                            "id": 14,
                            "module": "telegram:SendReplyMessage",
                            "version": 1,
                            "parameters": { "__IMTCONN__": 8829891 },
                            "mapper": {
                                "text": "🟡 <b>CORRECTION ORPHAN</b>\r\n\r\nForm submitted but no matching row found.\r\n\r\n<b>Email:</b> {{1.email}}\r\n<b>TV Username:</b> {{1.tv_username}}\r\n<b>Whop Order:</b> {{ifempty(1.whop_order_id; \"not provided\")}}\r\n<b>IP:</b> {{1.ip}}\r\n\r\n<b>🎯 ACTION:</b> Check Pipeline sheet + Whop dashboard. If legitimate, grant manually.\r\n\r\n— Rainbow Matrix Correction v1",
                                "chatId": "{{13.secret_value}}",
                                "parseMode": "HTML",
                                "replyMarkup": "",
                                "messageThreadId": "",
                                "replyToMessageId": "",
                                "replyMarkupAssembleType": "reply_markup_enter"
                            },
                            "metadata": {
                                "designer": { "x": 3000, "y": 300 },
                                "restore": {
                                    "expect": {
                                        "parseMode": { "label": "HTML" },
                                        "disableNotification": { "mode": "chose" },
                                        "replyMarkupAssembleType": { "label": "Enter the Reply Markup" }
                                    },
                                    "parameters": {
                                        "__IMTCONN__": {
                                            "data": { "scoped": "true", "connection": "telegram" },
                                            "label": "Telegram_RB_Ops"
                                        }
                                    }
                                },
                                "parameters": [
                                    { "name": "__IMTCONN__", "type": "account:telegram", "label": "Connection", "required": true }
                                ],
                                "expect": [
                                    { "name": "chatId", "type": "text", "label": "Chat ID", "required": true },
                                    { "name": "text", "type": "text", "label": "Text", "required": true },
                                    { "name": "parseMode", "type": "select", "label": "Parse Mode" }
                                ]
                            }
                        },
                        {
                            "id": 15,
                            "module": "google-sheets:addRow",
                            "version": 2,
                            "parameters": { "__IMTCONN__": 8821770 },
                            "mapper": {
                                "mode": "fromAll",
                                "values": {
                                    "0": "{{now}}",
                                    "1": "correction.orphan",
                                    "2": "",
                                    "3": "{{1.email}}",
                                    "4": "",
                                    "5": "",
                                    "6": "{{1.tv_username}}",
                                    "7": "{{ifempty(1.whop_order_id; \"\")}}",
                                    "8": "",
                                    "9": "no_match_found",
                                    "10": "",
                                    "11": "",
                                    "12": "correction.orphan",
                                    "13": "Form submitted but no matching error_username_not_found row found. IP: {{1.ip}} — UA: {{1.user_agent}}"
                                },
                                "sheetId": "Página1",
                                "spreadsheetId": "1dYTAjksYXniocJEZedDCJBGD0lJ2G_gBuHuNNG8Qc18",
                                "includesHeaders": true,
                                "insertDataOption": "INSERT_ROWS",
                                "useColumnHeaders": false,
                                "valueInputOption": "USER_ENTERED",
                                "insertUnformatted": false
                            },
                            "metadata": {
                                "designer": { "x": 3300, "y": 300 },
                                "restore": {
                                    "expect": {
                                        "mode": { "label": "Select from all" },
                                        "sheetId": { "mode": "chose", "label": "Página1" },
                                        "includesHeaders": { "label": "Yes" },
                                        "insertDataOption": { "mode": "chose", "label": "Insert rows" },
                                        "useColumnHeaders": { "label": "No" },
                                        "valueInputOption": { "mode": "chose", "label": "User entered" },
                                        "insertUnformatted": { "mode": "chose" }
                                    },
                                    "parameters": {
                                        "__IMTCONN__": {
                                            "data": { "scoped": "true", "connection": "google" },
                                            "label": "Pipeline Planilha Google (google@guitavares.com.br)"
                                        }
                                    }
                                },
                                "parameters": [
                                    { "name": "__IMTCONN__", "type": "account:google", "label": "Connection", "required": true }
                                ],
                                "expect": [
                                    { "name": "mode", "type": "select", "label": "Search Method", "required": true },
                                    { "name": "insertUnformatted", "type": "boolean", "label": "Unformatted", "required": true },
                                    { "name": "valueInputOption", "type": "select", "label": "Value input option", "required": true },
                                    { "name": "insertDataOption", "type": "select", "label": "Insert data option" },
                                    { "name": "spreadsheetId", "type": "text", "label": "Spreadsheet ID", "required": true },
                                    { "name": "sheetId", "type": "select", "label": "Sheet Name", "required": true },
                                    { "name": "includesHeaders", "type": "select", "label": "Table contains headers", "required": true },
                                    { "name": "useColumnHeaders", "type": "select", "label": "Use column headers as IDs of the columns", "required": true },
                                    { "name": "values", "type": "collection", "label": "Values in columns" }
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    ],
    "metadata": {
        "instant": true,
        "version": 1,
        "scenario": {
            "roundtrips": 1,
            "maxErrors": 3,
            "autoCommit": true,
            "autoCommitTriggerLast": true,
            "sequential": false,
            "slots": null,
            "confidential": false,
            "dataloss": false,
            "dlq": false,
            "freshVariables": false
        },
        "designer": {
            "orphans": []
        },
        "zone": "us2.make.com",
        "notes": []
    }
}
