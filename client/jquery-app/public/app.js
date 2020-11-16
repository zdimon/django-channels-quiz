(function( $ ) {
    $.fn.quizPlugin = function() {
    
        console.log('my plugin');
        var app = {};
        app.sticker = 0;
        app.currentQuestion = '';

        app.start = function() {
            if(sessionStorage.getItem('username')) {
                this.initRoom();
            } else {
                this.loginForm();
            }
        };

        app.loginForm = function() {
            let form = $('#loginForm').show();
            let url = 'http://quizapi.webmonstr.com/v1/quiz/sticker/list';
            $.get( url, ( data ) => {
                data.forEach((el) => {
                    let img_tag = `<img data-id="${el.id}" class="sticker" width="50" src="${el.get_url}" />`;
                    let parent = $('#stickers').append(img_tag);
                 })
                 $('.sticker').on('click',(event)=>{
                     console.log(this);
                     $('.sticker').each((indx,el)=>{
                         $(el).removeClass('active-sticker');
                     })
                     $(event.target).addClass('active-sticker');
                     this.sticker = $(event.target).attr('data-id');
                 })
                 
              });
              $('#chat-start').on('click',() => {this.submitLogin()});
        }

        app.submitLogin = function() {
            let data = {
                name: $('#userName').val(),
                sticker_id: this.sticker
            };
            let url = 'http://quizapi.webmonstr.com/v1/quiz/player/join';
            $.post( url, data, ( response ) => {
                console.log(response);
                sessionStorage.setItem('username',response.name);
                sessionStorage.setItem('sticker',response.sticker.get_url);
                let form = $('#loginForm').hide();
                this.initRoom();
            });
        }

        app.getCurrentQuestion = function() {
            let url = 'http://quizapi.webmonstr.com/v1/quiz/get_current_question';
            $.get( url, ( response ) => {
                this.currentQuestion = response.question;
                $('#currentQuestionBlock').html(response.question);
            });
        };
        
        app.getMessages = function() {
            $('#chatContent').empty();
            let url = 'http://quizapi.webmonstr.com/v1/quiz/message/list';
            $.get( url, ( response ) => {
                response.forEach((el)=> {
                    let tpl = `                                             <div class="chat ${el.is_right? 'chat-left': ''} ">
                    <div class="chat-user">
                       <a class="avatar m-0">
                       <img src="${el.playerimage}" alt="avatar" class="avatar-35 ">
                       </a>
                       <span class="chat-time mt-1">${el.playername}</span>
                    </div>
                    <div class="chat-detail">
                       <div class="chat-message">
                          <p>${el.text}</p>
                       </div>
                    </div>
                 </div>`;
                 $('#chatContent').append(tpl);
                    console.log(el);
                })
            });
        };

        app.socketConnection = function() {
            let webSocket = new WebSocket('ws://quizapi.webmonstr.com:7777/quiz/');
    
            webSocket.onerror = (evt) => {
                
            }
    
            webSocket.onmessage = (event) => {
                var payload = JSON.parse(event.data)
                console.log(payload);
                if(payload.type === 'message'){
                    this.getMessages();
                    if(payload.message.is_right) {
                        this.getUserList();
                    }
                }
            }
    
            webSocket.onclose =  (event) => {
                console.log('Close connection');
            };
    
            webSocket.onopen =  (event) => {
                console.log('Connection established');
            };
        }

        app.sendMessage = function() {
            let data = {
                message: $('#messageBox').val(),
                playername: sessionStorage.getItem('username')
            }
            let url = 'http://quizapi.webmonstr.com/v1/quiz/save_message';
            $.post( url, data, ( response ) => {
                $('#messageBox').val('');
            });
        };

        app.setCurrentUser = function() {
            $('#currentUserName').html(sessionStorage.getItem('username'));
            $('#currentUserSticker').attr('src',sessionStorage.getItem('sticker'));
        }

        app.getUserList = function() {
            $('#playerListBlock').empty();
            let url = 'http://quizapi.webmonstr.com/v1/quiz/player/list';
            $.get( url, ( response ) => {
                //console.log(response);
                response.forEach((el) => {
                    let tpl = `                     <div class="media-height p-3">
                    <div class="media align-items-center mb-4">
                       <div class="iq-profile-avatar status-online">
                          <img class="rounded-circle avatar-50" src="${el.sticker.get_url}" alt="">
                       </div>
                       <div class="media-body ml-3">
                          <h6 class="mb-0"><a href="#">${el.name}</a></h6>
                          <p class="mb-0">${el.account}</p>
                       </div>
                    </div>
                 </div>`;
                    $('#playerListBlock').append(tpl);
                });
            });
        };

        app.initRoom = function() {
            this.setCurrentUser();
            this.getUserList();
            this.getCurrentQuestion();
            this.getMessages();
            this.socketConnection();
            $('#sendButton').on('click',()=>{
                this.sendMessage();
            });
        }


        return app;


    };
})(jQuery);

