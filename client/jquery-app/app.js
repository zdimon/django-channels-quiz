(function( $ ) {
    $.fn.quizPlugin = function() {
        var app = {};
        app.root = this;
        app.timer = null;
        app.username;
        app.serverURL = 'localhost:7777';
        //$(app.root).append('<div id="wsLog"></div>');
        app.logdiv = $(app.root).find('#wsLog');
        app.start = function() {

            if(sessionStorage.getItem('username')) { 
                this.username = sessionStorage.getItem('username');
                this.initRoom();
                this.getCurrentQuestion();
                this.getUserList();
            } else {
                this.loginForm()
            }
        }

        app.loginForm = function() {
            let tpl = `<div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="userName" aria-describedby="emailHelp">
            <small id="emailHelp" class="form-text text-muted">Имя должно быть уникальным</small>
            </div>
            <div id="stickers"></div>
            <a class="btn btn-outline-primary" id="loginButton" href="#">Логин</a>
            `
            $(this.root).append(tpl);
            $(this.root).find('#loginButton').on('click', () => {
                this.login();
                this.wsConnect();
            })
            this.getStickers();
        }

        app.initRoom = function() {
            this.wsConnect();
            let tpl = `
            <div id="quizRoom">
                <div id="questionBlock"> </div>
                <div id="answersBlock"> </div>
                <div id="playersBlock"> </div>
                <div id="formBlock"> 
                    <input id="messageInput" type="text"/>
                    <button id="sendAnswer" >Отправить</button>
                </div>
            </div>
            `
            $(this.root).append(tpl);
            $(this.root).find('#sendAnswer').on('click', () => {
                this.sendAnswer()
            })
        }

        app.sendAnswer = function() {

            let data = {
                message: $(this.root).find('#messageInput').val(),
                playername: this.username
            };
            $.post(
                `http://${this.serverURL}/v1/quiz/save_message`, 
                data, 
                (rez) => {
                 console.log(rez);
                 $(this.root).find('#messageInput').val('')
            }); 
        };

        app.login = function() {
            let username =  $(this.root).find('#userName').val();
            let data = {
                name: username,
                sticker_id: 81
            }
            $.post(
                `http://${this.serverURL}/v1/quiz/player/join`, 
                data, 
                (rez) => {
                 console.log(rez);
                 sessionStorage.setItem('username', username);
            });
        };

        app.wslog = function(message) {
            this.logdiv.append(`<p>${message}</p>`);
        }

        app.getStickers = function() {
            $.get(`http://${this.serverURL}/v1/quiz/sticker/list`, (data, status) => {
                 data.forEach((el) => {
                    let s = `<img class="sticker" src="${el.get_url}" />`
                    $(this.root).find('#stickers').append(s);
                 })
            });
        };

        app.getCurrentQuestion = function() {
            $(this.root).find('#questionBlock').empty();
            $.get(`http://${this.serverURL}/v1/quiz/get_current_question`, (data, status) => {
                let tpl = `
                  <p>${data.question} (${data.answers})</p>
                `;
                $(this.root).find('#questionBlock').append(tpl);
            });
        };

        app.getUserList = function() {
            $(this.root).find('#playersBlock').empty();
            $.get(`http://${this.serverURL}/v1/quiz/player/list`, (data, status) => {
                console.log(data);
                //$(this.root).find('#playersBlock').append(tpl);
                data.forEach((el) => {
                    let tpl = `
                    <p> ${el.name} (${el.account})</p>
                    `;
                    $(this.root).find('#playersBlock').append(tpl);
                });
            });
        };


        app.addMessage = function(message) {
            let tpl = `
                <p> user: ${message.playername} </p>
                <p> message: ${message.text}</p>
                <p> is right: ${message.is_right}</p>
            `;
            $(this.root).find('#answersBlock').append(tpl);
        }

        

        app.wsConnect = function() {
            
            clearInterval(this.timer);
            webSocket = new WebSocket('ws://localhost:7777/quiz/');
    
            webSocket.onerror = (evt) => {
                this.timer = setTimeout(function(){this.wsConnect()}.bind(this),1000);
            }
    
            webSocket.onmessage = (event) => {
                var message = JSON.parse(event.data)
                this.wslog(message);
                if(message.type === 'message') {
                    this.addMessage(message.message);
                    if(message.message.is_right) {
                        this.getCurrentQuestion();
                        this.getUserList();
                    }
                }
            }
    
            webSocket.onclose =  (event) => {
                this.wslog('Close connection');
                this.timer = setTimeout(function(){this.wsConnect()}.bind(this),1000);
            };
    
            webSocket.onopen =  (event) => {
                this.wslog('Connection established');
            };
        };


        return app;
    };
})(jQuery);