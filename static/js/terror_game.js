var TerrorGame;
TerrorGame = (function() {
        function TerrorGame(el){
              this.$el=$(el);
              
              this.initHTML();
        }

        TerrorGame.prototype.initHTML=function(){
              this.$el.html('<img src="image/logo.png"/><div class="container"></div><div class="controller"><div class="pause-controller">请点击任意地方继续</div><div class="input-controller"><input type="text"/><a href="javascript:;">确定</a></div></div>');
        }

        TerrorGame.prototype.echo=function(text,callback){
                var text=text||""
                ,$div=$("<div>"+filterStr(text)+"</div>")
                ,$pause_controller=$(".pause-controller",this.$el) 
                ,evname="click";
                $(".container",this.$el).append($div);
                $pause_controller.show();

                this.scrollToBottom();
                window.setTimeout(function(){
                    $(document).off(evname).one(evname,function(){
                       $pause_controller.hide();
                       callback&&callback(null);     
                    });
                },0);
               
                         

         }

         TerrorGame.prototype.select=function(text,options,callback){
              var text=text||""
              ,options=options||{}
              ,$div=$("<div></div>")
              ,htmlAry=[]
              ,evname="click"
              
              
              text&&htmlAry.push('<div>'+filterStr(text)+'</div>');
              htmlAry.push('<ul >');
              for(var i in options){
                  htmlAry.push("<li goto='"+options[i].goto+"'>"+filterStr(i)+"</li>");
              }
              htmlAry.push("</ul>");
              $div.off(evname).one(evname,"li",function(){
                  $div.append("<br/><font color='aqua'>【答】</font>"+$(this).text());
                  
                  callback&&callback($(this).attr("goto"));
              });
             
             $div.html(htmlAry.join(''));
             $(".container",this.$el).append($div);

             this.scrollToBottom();

              
         }

         TerrorGame.prototype.input=function(text,options,callback){
               var text=text||""
               ,options=options||{}
               ,$div=$("<div>"+filterStr(text)+"</div>")
               ,$input_controller=$(".input-controller",this.$el)
               ,$input_text=$("input",$input_controller)
               ,evname="click"
               ,callback=callback||function(){}
                
               $(".container",this.$el).append($div);
               $input_controller.show();

                this.scrollToBottom();
                $input_text.focus();
                $("a",$input_controller).off(evname).one(evname,function(){
                       $input_controller.hide();
                       var v=$input_text.val();
                       $div.append("<br/><font color='aqua'>【答】</font>"+v);
                        
                        for(var i in options){
                                if((new RegExp(i)).test(v)){
                                    callback(options[i].goto);
                                    return;
                                }
                        }

                        callback(options.other?options.other.goto:null); 
                });
         }
         
         TerrorGame.prototype.scrollToBottom=function(){
                var me=this;
                window.setTimeout(function(){
                    $(document).scrollTop($(".container",this.$el).height());
                },0);
         }

         TerrorGame.prototype.exit=function(){
           $(".container",this.$el).append($("<div><font color='white'>游戏结束</font></div>"));
            this.scrollToBottom();
         }


         TerrorGame.prototype.start=function(ary,wcallback,i){
                i=i||0;
                var me=this,type,wcallback=wcallback||function(){}
                if(ary[i]){
                   type=ary[i].input?2:ary[i].options?1:0;
                   switch(type){
                      case 1:
                         me.select(ary[i].msg,ary[i].options,callback);
                         break;
                      case 2:
                         me.input(ary[i].msg,ary[i].input,callback);
                        break
                      case 0:
                         me.echo(ary[i].msg,callback);
                        break
                   }

                }else{
                   me.exit();
                   wcallback();
                }

                function callback(goto){
                    goto=ary[i].goto||goto;
                    if(goto=="$exit"){
                         me.exit();
                         wcallback();
                        return;
                    }else if(goto==null){
                        me.start(ary,wcallback,i+1);
                    }else if(goto){
                       for(var j=0;j<ary.length;j++){
                             if(ary[j].id==goto){
                                   me.start(ary,wcallback,j);
                                   return;
                             }
                        }
                       me.start(ary,wcallback,i+1);
                    }
                }

         }


     
         function filterStr(str){
            str=str.replace(/<\/?[^>]*>/g,'').replace("\n","<br/>").replace(/\s/g,"&nbsp;");
                  var newAry=[];

                  var strAry=str.split(/§r/);

                  for(var i=0;i<strAry.length;i++){
                        var str=strAry[i];
                         // newAry.push();
                        var strAry1=str.split(/(§\w{1})/);
                        var ary=[];
                        newAry.push(ary)
                        dg(strAry1,0,ary);
                  }
                  

                  function dg(strAry,i,newAry){
                      i=i||0;
                      if(i<strAry.length){
                          var strv=strAry[i],endStr;
                          switch(strv){
                              case "§0":
                                  //黑色
                                  newAry.push("<font color='black'>");
                                  endStr="</font>";
                                 break;
                              case "§1":

                                  //深蓝色
                                  newAry.push("<font color='darkblue'>");
                                  endStr="</font>";
                                 break;
                              case "§2":
                                  //深绿色
                                  newAry.push("<font color='darkgreen'>");
                                  endStr="</font>";
                                 break;
                              case "§3":
                                   //天蓝色
                                  newAry.push("<font color='azure'>");
                                  endStr="</font>";
                                 break;
                              case "§4":
                                   //红色
                                  newAry.push("<font color='red'>");
                                  endStr="</font>";
                                 break;
                              case "§5":
                                   //深紫
                                  newAry.push("<font color='darkviolet'>");
                                  endStr="</font>";
                                 break;
                              case "§6":
                                   //金黄
                                  newAry.push("<font color='gold'>");
                                  endStr="</font>";
                                 break;
                               case "§7":
                                   //浅灰
                                  newAry.push("<font color='lightgray'>");
                                  endStr="</font>";
                                 break;
                                case "§8":
                                   //深灰
                                  newAry.push("<font color='darkgray'>");
                                  endStr="</font>";
                                 break;
                              case "§9":
                                   //淡紫
                                  newAry.push("<font color='lavender'>");
                                  endStr="</font>";
                                 break;
                              case "§a":
                                   //浅绿
                                  newAry.push("<font color='aqua'>");
                                  endStr="</font>";
                                 break;
                              case "§f":
                                   //白色
                                  newAry.push("<font color='white'>");
                                  endStr="</font>";
                                 break;
                              case "§l":
                                   //字体加粗
                                  newAry.push("<b>");
                                  endStr="</b>";
                                 break;
                             case "§m":
                                   //斜体字
                                  newAry.push("<i>");
                                  endStr="</i>";
                                 break;
                             case "§n":
                                   //下划线
                                  newAry.push("<u>");
                                  endStr="</u>";
                                 break;
                              case "§o":
                                   //删除线
                                  newAry.push("<strike>");
                                  endStr="</strike>";
                                 break;
                              default:
                                  newAry.push(strv);
                                  break;
                          }
                          dg(strAry,i+1,newAry);
                          endStr&&newAry.push(endStr); 
                      }
                  }
                  


                  for(var i=0;i<newAry.length;i++){
                       newAry[i]=newAry[i].join('');
                  }


                   return newAry.join('');
        };
                         
      return TerrorGame;

})();