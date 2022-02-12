var liczBom = 0;
        var score = 0;
        var plansza = [];
        function prepare(){
            console.log("play");
            document.getElementById("play").disabled = true;
            document.getElementById("poz1").disabled = true;
            document.getElementById("poz2").disabled = true;
            document.getElementById("poz3").disabled = true;
            document.getElementById("szerPl").disabled = true;
            document.getElementById("wysPl").disabled = true;
            document.getElementById("ilBom").disabled = true;

            width = document.getElementById("szerPl").value;
            height = document.getElementById("wysPl").value;
            bomby = document.getElementById("ilBom").value;

            liczBom = bomby;
            document.getElementById("liczBomby").innerText = liczBom;

            for(x = 0; x < height; x++){
                plansza.push([0]);
                for(y = 0; y < width; y++){
                    plansza[x].push(0);
                }
            }
            print();
            document.getElementById("emoji").innerText = "🤔";
        }

        function graj(w, h, id){
            bomby = document.getElementById("ilBom").value;
            szer = document.getElementById("szerPl").value;
            wys = document.getElementById("wysPl").value;
            for(ilBomb = 0; ilBomb < bomby; ilBomb++){
                var ranW = Math.floor(Math.random() * szer);
                while(true){
                    if(ranW != w && ranW != w + 1 && ranW != w - 1){
                        break;
                    }
                    var ranW = Math.floor(Math.random() * szer);
                    console.log("rolled");
                    
                }
                

                var ranH = Math.floor(Math.random() * wys);
                while(ranH == h && ranH == h + 1 && ranH == h - 1){
                    var ranH = Math.floor(Math.random() * wys);

                }
                
                
                if(plansza[ranH][ranW] != -1){
                    console.log(ranH + "  " + ranW);
                    plansza[ranH][ranW] = -1;
                   
                    if(ranH != 0){
                        if(plansza[ranH - 1][ranW] != -1){plansza[ranH - 1][ranW]++;}
                    }
                    if(ranH != document.getElementById("wysPl").value -1){
                        if(plansza[ranH + 1][ranW] != -1){
                            plansza[ranH + 1][ranW]++;}
                    }
                    if(ranW != document.getElementById("szerPl").value -1){
                        if(plansza[ranH][ranW + 1] != -1){plansza[ranH][ranW + 1]++;}
                    }
                    if(ranW != 0){
                        if(plansza[ranH][ranW - 1] != -1){plansza[ranH][ranW - 1]++;}
                    }
                    if(ranH != 0 && ranW != 0){
                        if(plansza[ranH - 1][ranW - 1] != -1){plansza[ranH - 1][ranW - 1]++;}
                    }
                    if(ranH != document.getElementById("wysPl").value-1 && ranW != document.getElementById("szerPl").value -1){
                        if(plansza[ranH + 1][ranW + 1] != -1){plansza[ranH + 1][ranW + 1]++;}
                    }
                    if(ranH != 0 && ranW != document.getElementById("szerPl").value-1){
                        if(plansza[ranH - 1][ranW + 1] != -1){plansza[ranH - 1][ranW + 1]++;}
                    }
                    if(ranH != document.getElementById("wysPl").value-1 && ranW != 0){
                        if(plansza[ranH + 1][ranW - 1] != -1){plansza[ranH + 1][ranW - 1]++;}
                    }
                }else{
                    console.log("bomb skip");
                    ilBomb--;
                    continue;
                }
            }
            document.getElementById("plansza").innerHTML = "";
            idCount = 0;
            print();
            revealThis(id);
            document.getElementById("emoji").innerText = "😳";
        }

        var idCount = 0;
        function print(){
            for(x = plansza.length - 1; x >= 0; x--){
                var table = document.getElementById("plansza");
                var row = table.insertRow(0);
                for(y = 0; y < plansza[x].length - 1; y++){
                    var cell1 = row.insertCell(y);

                    if(plansza[x][y] == -1){
                        cell1.innerHTML = "<div id='D" + idCount + "' class='hidden' onmousedown='WhichButton(event, " + idCount + ")'>💣</div><a id='A" + idCount + "' style='font-size: 0%; margin-top:-25px; margin-left: -15px; position: absolute;'>🚩</a>";
                    }else{
                        cell1.innerHTML = "<div id='D" + idCount + "' class='hidden' onmousedown='WhichButton(event, " + idCount + ")'>" + plansza[x][y] + "</div><a id='A" + idCount + "' style='font-size: 0%; margin-top:-25px; margin-left: -15px; position: absolute;'>🚩</a>";
                    }

                    
                    idCount++;
                }
            }
            updateWidth();
        }

        function RevealAround(id){
            var width = plansza[0].length - 1;

            if(((id + 1) / width) % 1 != 0){
                revealThis(id + 1);
                revealThis(id - width + 1);
                revealThis(id + width + 1);
            }
            if(((id) / width) % 1 != 0){
                revealThis(id - 1);
                revealThis(id + width - 1);
                revealThis(id - width - 1);
            }
            revealThis(id + width);
            revealThis(id - width);
        }
        function revealThis(id){
            if(document.getElementById("D" + id) === null){return;}
            if(document.getElementById("D" + id).style.fontSize == "100%"){return;}
            document.getElementById("D" + id).style.fontSize = "100%";
            if(document.getElementById("D" + id).innerText == "0"){
                document.getElementById("D" + id).style.backgroundColor = "gray";
                RevealAround(id);
            }else if(document.getElementById("D" + id).innerText == "💣"){
                document.getElementById("D" + id).style.backgroundColor = "red";
                dead();
            }else{
                document.getElementById("D" + id).style.backgroundColor = "orange";
            }
            score += 10;
            ScoreUpdate();
        }

        function clean(){
            console.log("clear");
            document.getElementById("plansza").innerHTML = "";
            location.reload();
        }
        
        window.oncontextmenu = function ()
        {
            return false;     // cancel default menu
        }

        var didStart = 0;
        function WhichButton(event, id) {
            if(didStart == 0){
                didStart = 1; 
                height = 0;
                width = 0;

                height = Math.abs(Math.floor((id) / document.getElementById("szerPl").value) - document.getElementById("szerPl").value) - 1;
                width = id - document.getElementById("szerPl").value * (Math.floor((id) / document.getElementById("szerPl").value));

                graj(width, height, id);
                return;
            }

            

            if(event.button == 2){
                if(document.getElementById("A" + id).style.fontSize == "0%"){
                    document.getElementById("A" + id).style.fontSize = "100%";
                    liczBom--;
                }else{
                    document.getElementById("A" + id).style.fontSize = "0%";
                    liczBom++;
                }
                document.getElementById("liczBomby").innerText = liczBom;

            }else if(event.button == 0){
                document.getElementById("D" + id).style.fontSize = "100%";
                if(document.getElementById("D" + id).innerText == "0"){
                    document.getElementById("D" + id).style.backgroundColor = "gray";
                    RevealAround(id);
                }else if(document.getElementById("D" + id).innerText == "💣"){
                    document.getElementById("D" + id).style.backgroundColor = "red";
                    dead();
                }else{
                    document.getElementById("D" + id).style.backgroundColor = "orange";
                }
                score += 10;
                ScoreUpdate();
            }
        }

        function poziom(a){
            switch(a){
                case 1:
                document.getElementById("szerPl").value = 8;
                document.getElementById("wysPl").value = 8;
                document.getElementById("ilBom").value = 10;
                    break;
                case 2:
                document.getElementById("szerPl").value = 16;
                document.getElementById("wysPl").value = 16;
                document.getElementById("ilBom").value = 40;
                    break;
                case 3:
                document.getElementById("szerPl").value = 30;
                document.getElementById("wysPl").value = 16;
                document.getElementById("ilBom").value = 99;
                    break;
            }
        }

        var isDead = 0;
        function dead(){
            isDead++;
            for(x = 0; x < idCount; x++){
                document.getElementById("D" + x).style.fontSize = "100%";
                if(document.getElementById("D" + x).innerText == "0"){
                    document.getElementById("D" + x).style.backgroundColor = "gray";
                }else if(document.getElementById("D" + x).innerText == "💣"){
                    document.getElementById("D" + x).style.backgroundColor = "red";
                }else{
                    document.getElementById("D" + x).style.backgroundColor = "orange";
                }
            }
            document.getElementById("emoji").innerText = "😵";
        }

        function ScoreUpdate(){
            document.getElementById("liczWynik").innerText = score;

            width = document.getElementById("szerPl").value;
            height = document.getElementById("wysPl").value;
            bomby = document.getElementById("ilBom").value;

            if(height * width * 10 - bomby * 10 <= score && isDead == 0){
                win();
            }
        }

        function win(){
            document.getElementById("emoji").innerText = "😎";
            alert("🎉Congratulations on your win!🎉");
        }

        function updateWidth(){
            tWid = document.getElementById("plansza").clientWidth;
            document.getElementById("topTable").style.width = tWid;
        }