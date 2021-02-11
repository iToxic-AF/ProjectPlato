function showBattleSeaGamePage() {
    document.getElementById("allGameMenu").style.display = "none";
    document.getElementById("seaBattleGamePage").style.display = "block";
    gameMenuInit('battle');
}

function showDotsAndBoxesGamePage() {
    document.getElementById("allGameMenu").style.display = "none";
    document.getElementById("dotsAndBoxesGamePage").style.display = "block";
    gameMenuInit('dots');
}

function showSeaBattleGamesDiv() {
    document.getElementById("SB-HistoryRibbon").style.backgroundColor = "#122948";
    document.getElementById("SB-HowToPlayRibbon").style.backgroundColor = "#122948";
    document.getElementById("SB-LeaderboardRibbon").style.backgroundColor = "#122948";
    document.getElementById("SB-GamesRibbon").style.backgroundColor = "#bb2d44";

    document.getElementById("SB-HowToPlayDiv").style.display = "none";
    document.getElementById("SB-leaderboardDiv").style.display = "none";
    document.getElementById("SB-historyDiv").style.display = "none";
    document.getElementById("SB-GamesDiv").style.display = "flex";
}

function showSeaBattleHistoryDiv() {
    document.getElementById("SB-GamesRibbon").style.backgroundColor = "#122948";
    document.getElementById("SB-HistoryRibbon").style.backgroundColor = "#bb2d44";
    document.getElementById("SB-HowToPlayRibbon").style.backgroundColor = "#122948";
    document.getElementById("SB-LeaderboardRibbon").style.backgroundColor = "#122948";

    document.getElementById("SB-GamesDiv").style.display = "none";
    document.getElementById("SB-HowToPlayDiv").style.display = "none";
    document.getElementById("SB-leaderboardDiv").style.display = "none";
    document.getElementById("SB-historyDiv").style.display = "flex";
}

function showSeaBattleLeaderboardDiv() {
    document.getElementById("SB-GamesRibbon").style.backgroundColor = "#122948";
    document.getElementById("SB-HistoryRibbon").style.backgroundColor = "#122948";
    document.getElementById("SB-HowToPlayRibbon").style.backgroundColor = "#122948";
    document.getElementById("SB-LeaderboardRibbon").style.backgroundColor = "#bb2d44";

    document.getElementById("SB-GamesDiv").style.display = "none";
    document.getElementById("SB-HowToPlayDiv").style.display = "none";
    document.getElementById("SB-historyDiv").style.display = "none";
    document.getElementById("SB-leaderboardDiv").style.display = "flex";
}

function showSeaBattleHowToPlayDiv() {
    document.getElementById("SB-GamesRibbon").style.backgroundColor = "#122948";
    document.getElementById("SB-HistoryRibbon").style.backgroundColor = "#122948";
    document.getElementById("SB-HowToPlayRibbon").style.backgroundColor = "#bb2d44";
    document.getElementById("SB-LeaderboardRibbon").style.backgroundColor = "#122948";

    document.getElementById("SB-GamesDiv").style.display = "none";
    document.getElementById("SB-historyDiv").style.display = "none";
    document.getElementById("SB-leaderboardDiv").style.display = "none";
    document.getElementById("SB-HowToPlayDiv").style.display = "flex";
}

function showDotsAndBoxesGamesDiv() {
    document.getElementById("GamesRibbon").style.backgroundColor = "#bb2d44";
    document.getElementById("HistoryRibbon").style.backgroundColor = "#122948";
    document.getElementById("HowToPlayRibbon").style.backgroundColor = "#122948";
    document.getElementById("LeaderboardRibbon").style.backgroundColor = "#122948";

    document.getElementById("DB-HowToPlayDiv").style.display = "none";
    document.getElementById("DB-leaderboardDiv").style.display = "none";
    document.getElementById("DB-historyDiv").style.display = "none";
    document.getElementById("DB-GamesDiv").style.display = "flex"
}

function showDotsAndBoxesHistoryDiv() {
    document.getElementById("GamesRibbon").style.backgroundColor = "#122948";
    document.getElementById("HistoryRibbon").style.backgroundColor = "#bb2d44";
    document.getElementById("HowToPlayRibbon").style.backgroundColor = "#122948";
    document.getElementById("LeaderboardRibbon").style.backgroundColor = "#122948";

    document.getElementById("DB-GamesDiv").style.display = "none";
    document.getElementById("DB-HowToPlayDiv").style.display = "none";
    document.getElementById("DB-leaderboardDiv").style.display = "none";
    document.getElementById("DB-historyDiv").style.display = "flex";
}

function showDotsAndBoxesLeaderboardDiv() {
    document.getElementById("GamesRibbon").style.backgroundColor = "#122948";
    document.getElementById("HistoryRibbon").style.backgroundColor = "#122948";
    document.getElementById("HowToPlayRibbon").style.backgroundColor = "#122948";
    document.getElementById("LeaderboardRibbon").style.backgroundColor = "#bb2d44";

    document.getElementById("DB-GamesDiv").style.display = "none";
    document.getElementById("DB-HowToPlayDiv").style.display = "none";
    document.getElementById("DB-historyDiv").style.display = "none";
    document.getElementById("DB-leaderboardDiv").style.display = "flex";
}

function showDotsAndBoxesHowToPlay() {
    document.getElementById("GamesRibbon").style.backgroundColor = "#122948";
    document.getElementById("HistoryRibbon").style.backgroundColor = "#122948";
    document.getElementById("HowToPlayRibbon").style.backgroundColor = "#bb2d44";
    document.getElementById("LeaderboardRibbon").style.backgroundColor = "#122948";

    document.getElementById("DB-GamesDiv").style.display = "none";
    document.getElementById("DB-historyDiv").style.display = "none";
    document.getElementById("DB-leaderboardDiv").style.display = "none";
    document.getElementById("DB-HowToPlayDiv").style.display = "flex";
}

function gameMenuInit(game) {
    let gameName, historyList, leaderBoardList, image, userInfo, userLevel;
    if (game === 'battle') {
        gameName = 'See Battle';
        historyList = document.querySelector('#SB-historyDiv');
        leaderBoardList = document.querySelector('#SB-leaderboardDiv');
        image = 'jpg/battleship.png';
        userInfo = document.querySelector('#SB-userInfo');
        userLevel = document.querySelector('#SB-userLevel');
    } else {
        gameName = 'Dots And Boxes';
        historyList = document.querySelector('#DB-historyDiv');
        leaderBoardList = document.querySelector('#DB-leaderboardDiv');
        image = 'jpg/com.dot.box.game-logo.png';
        userInfo = document.querySelector('#DB-userInfo');
        userLevel = document.querySelector('#DB-userLevel');

    }

    const connection = new WebSocket('ws://127.0.0.1:4444');

    connection.onopen = function () {
        connection.send("game " + game + " gamelogs " + username + " " + token);
    };
    connection.onmessage = function (e) {
        let user = e.data.split("@")[0].split(' ');
        let leaderBoardUsers = e.data.split("@")[1].split("/");
        if (e.data.split("@").length > 2) {
            let gameLogs = e.data.split("@")[2].split("/");

            historyList.innerHTML = ' ';
            for (let i = 1; i < gameLogs.length; i++)
                historyList.insertAdjacentHTML('beforeend',
                    '  <div class="game-history">\n' +
                    '                            <div class="game-icon">\n' +
                    '                                <img src="' + image + '">\n' +
                    '                            </div>\n' +
                    '                            <div class="history-info">\n' +
                    '                                <span> ' + gameName + '</span>\n' +
                    '                                <div>\n' +
                    '                                    <div class="opponent-name">' + gameLogs[i].split('-')[0] + '</div>\n' +
                    '                                    <div class="game-result">&nbsp; Won!</div>\n' +
                    '                                </div>\n' +
                    '                            </div>\n' +
                    '                            <div class="game-time">' + gameLogs[i].split('-')[1] + '</div>\n' +
                    '                        </div>');

        }
        leaderBoardList.innerHTML = ' ';
        for (let i = 0; i < leaderBoardUsers.length; i++) {

            leaderBoardList.insertAdjacentHTML('beforeend',
                '<div class="player-score">\n' +
                '                            <div class="rank"><span>' + String(i + 1) + '- </span></div>\n' +
                '                            <div class="player-avatar-rank">\n' +
                '                                <svg id="Capa_1" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><g><path d="m382.682 497.747v-34.909c0-71.315-57.812-129.127-129.127-129.127-71.315 0-129.127 57.812-129.127 129.127v34.909z" fill="#efc5b4"/>\n' +
                '                                    <path d="m339.749 497.747v-32.984c0-47.604-38.591-86.195-86.195-86.195-47.604 0-86.195 38.591-86.195 86.195v32.984z" fill="#e8a284"/><g fill="#9781dd"><path d="m178.027 470.609 2.524 17.69c1.382 9.683 12.728 14.24 20.423 8.201l14.058-11.031c7.695-6.038 5.968-18.142-3.109-21.787l-16.582-6.659c-9.077-3.645-18.696 3.903-17.314 13.586z"/><path d="m256.685 462.956-12.502 12.767c-6.844 6.989-3.556 18.765 5.919 21.197l17.307 4.444c9.474 2.432 18.029-6.303 15.398-15.724l-4.805-17.211c-2.631-9.421-14.473-12.462-21.317-5.473z"/><path d="m320.635 427.675-17.781 1.766c-9.734.967-14.771 12.108-9.067 20.054l10.42 14.516c5.704 7.946 17.871 6.738 21.9-2.175l7.361-16.282c4.031-8.913-3.099-18.845-12.833-17.879z"/></g><path d="m262.599 379.308c21.279 9.571 37.172 30.36 41.371 55.555.721 4.324 7.39 8.571 7.39 13.121l-6.293 7.68c0 11.632-9.43 21.062-21.062 21.062l-20.38 4.84-18.47-4.84h-28.545l-19.669 6.759-15.112-6.759h-14.47v21.286h172.389v-32.984c.001-44.548-33.796-81.198-77.149-85.72z" fill="#d57b84"/><path d="m210.074 490.843c3.98-4.636 7.332-9.764 11.51-14.117h-42.773c2.23 7.076 4.367 14.183 6.515 21.286h18.379c2.151-2.365 4.286-4.744 6.369-7.169z" fill="#8962de"/><path d="m281.488 476.726h-39.365c-1.451 3.632-1.581 6.922-.795 9.939.12.286.214.594.272.933 1.284 3.895 4.101 7.324 7.624 10.415h32.338c2.164-6.308 1.355-14.112-.074-21.287z" fill="#8962de"/><path d="m325.76 445.359c-7.597-4.749-14.993-9.811-22.583-14.557 1.231 5.579 1.89 11.4 1.89 17.39v7.472c0 2.538-.464 4.964-1.288 7.214 3.44 3.19 7.578 5.571 12.344 5.527 5.951-.054 10.619-3.449 13.817-8.227 2.013-3.007 3.54-6.277 4.785-9.682-3.036-1.615-6.035-3.306-8.965-5.137z" fill="#8962de"/><path d="m453.07 241.262c.591-5.663.9-11.41.9-17.23 0-90.562-73.415-163.976-163.976-163.976h-72.879c-90.561 0-163.976 73.414-163.976 163.976 0 5.82.308 11.567.9 17.23-17.817 5.161-30.849 21.588-30.849 41.068 0 23.617 19.145 42.762 42.762 42.762 6.73 0 13.093-1.558 18.757-4.328 29.831 40.763 78.022 67.245 132.405 67.245h72.879c54.383 0 102.574-26.482 132.405-67.245 5.664 2.77 12.028 4.328 18.758 4.328 23.617 0 42.762-19.145 42.762-42.762.001-19.48-13.03-35.907-30.848-41.068z" fill="#efc5b4"/><path d="m285.228 16.091h-63.347c-106.55 0-192.926 86.376-192.926 192.926v19.24c1.36 33.781 19.168 51.502 33.465 63.313l1.046 34.915c-4.637 60.076 30.447 87.533 57.464 67.302 0 25.82 20.276 46.752 45.287 46.752 19.822 0 36.658-13.153 42.796-31.462 3.48 25.413 22.093 44.819 44.542 44.819s41.063-19.407 44.542-44.819c6.138 18.309 22.974 31.462 42.796 31.462 25.011 0 45.286-20.932 45.286-46.752 28.059 13.367 53.99-12.564 57.464-67.302l2.597-35.652c19.581-12.122 29.778-30.661 31.914-62.576v-19.24c0-106.55-86.376-192.926-192.926-192.926zm115.955 271.696c0 27.474-22.272 49.746-49.745 49.746-27.474 0-49.746-22.272-49.746-49.746h.004c0-26.557-21.529-48.087-48.087-48.087s-48.087 21.529-48.087 48.087h.004c0 27.474-22.272 49.746-49.745 49.746-27.474 0-49.745-22.272-49.745-49.746 0 0-4.891-49.568 24.495-78.909l70.4-47.341 75.321 40.682c8.044 4.345 17.937-.781 19.026-9.858l3.523-29.357c.386-3.214 4.016-4.904 6.724-3.129l77.729 50.945c21.314 29.211 17.929 76.967 17.929 76.967z" fill="#a07575"/><path d="m285.229 16.091h-36.139c91.525 0 165.721 74.195 165.721 165.72v16.527c-1.834 27.415-.885 37.509-17.705 47.921l3.541 38.066c-1.073 32.946-19.257 45.535-37.44 53.228 0 22.178-17.416 40.159-38.9 40.159-5.201 0-10.162-1.054-14.696-2.966-12.633-5.329-27.29-3.044-37.731 5.841-6.361 5.413-14.163 8.6-22.595 8.6s-16.235-3.188-22.595-8.6c-10.442-8.885-25.099-11.17-37.731-5.841-4.533 1.912-9.495 2.966-14.696 2.966-13.726 0-25.792-7.339-32.716-18.423-5.549-8.884-14.892-14.85-25.265-16.302-10.337-1.447-40.52 18.345-52.957-21.225l.141 4.723c-4.636 60.076 30.447 87.533 57.464 67.302 0 25.82 20.276 46.752 45.287 46.752 19.822 0 36.658-13.153 42.796-31.462 3.48 25.413 22.093 44.819 44.542 44.819s41.063-19.407 44.542-44.819c6.138 18.309 22.974 31.462 42.796 31.462 25.011 0 45.286-20.932 45.286-46.752 28.058 13.367 53.99-12.564 57.464-67.302l2.597-35.652c19.581-12.122 29.778-30.661 31.914-62.576v-19.24c0-106.55-86.375-192.926-192.925-192.926z" fill="#925873"/><path d="m477.798 412.243 8.556 24.058c.366 1.03 1.092 1.846 2.007 2.259l21.375 9.63c3.02 1.361 3.02 6.172 0 7.532l-21.375 9.63c-.915.412-1.64 1.229-2.007 2.259l-8.556 24.058c-1.209 3.399-5.484 3.399-6.692 0l-8.556-24.058c-.366-1.03-1.092-1.846-2.007-2.259l-21.375-9.63c-3.02-1.361-3.02-6.172 0-7.532l21.375-9.63c.915-.412 1.64-1.229 2.007-2.259l8.556-24.058c1.208-3.399 5.483-3.399 6.692 0z" fill="#efc5b4"/><path d="m46.181 419.049 6.347 17.846c.272.764.81 1.37 1.488 1.676l15.855 7.143c2.24 1.009 2.24 4.578 0 5.587l-15.855 7.143c-.679.306-1.217.911-1.488 1.676l-6.347 17.846c-.897 2.521-4.067 2.521-4.964 0l-6.347-17.846c-.272-.764-.81-1.37-1.489-1.676l-15.855-7.143c-2.24-1.009-2.24-4.578 0-5.587l15.855-7.143c.679-.306 1.217-.911 1.489-1.676l6.347-17.846c.897-2.521 4.068-2.521 4.964 0z" fill="#efc5b4"/><ellipse cx="8.059" cy="368.278" fill="#e8a284" rx="8.059" ry="8.059" transform="matrix(.16 -.987 .987 .16 -356.755 317.242)"/></g><g><g fill="#3c122c"><path d="m193.187 505.485c-2.386 0-4.797-.458-7.12-1.391-6.359-2.554-10.734-8.129-11.701-14.913l-2.525-17.691c-.968-6.784 1.672-13.361 7.064-17.591s12.408-5.232 18.766-2.676l16.581 6.657c6.36 2.555 10.735 8.129 11.702 14.914.968 6.783-1.673 13.359-7.064 17.591l-14.057 11.03c-3.422 2.686-7.498 4.07-11.646 4.07zm-8.974-35.759 2.525 17.691c.476 3.33 2.946 4.662 3.986 5.08 1.04.417 3.745 1.164 6.392-.912l14.057-11.031c2.648-2.077 2.565-4.882 2.407-5.992-.158-1.109-.863-3.826-3.986-5.08l-16.581-6.657c-3.125-1.255-5.511.219-6.393.911-.882.69-2.882 2.659-2.407 5.99z"/><ellipse cx="155.726" cy="291.738" rx="18.306" ry="18.306" transform="matrix(.23 -.973 .973 .23 -163.987 376.271)"/><ellipse cx="351.384" cy="291.738" rx="18.306" ry="18.306" transform="matrix(.924 -.383 .383 .924 -84.896 156.676)"/><path d="m351.438 343.782c-30.876 0-55.995-25.119-55.995-55.995 0-.071.001-.142.003-.214-.116-22.971-18.839-41.624-41.837-41.624-23.007 0-41.736 18.669-41.837 41.653.002.061.003.122.003.184 0 30.876-25.119 55.995-55.994 55.995-30.778 0-55.835-24.958-55.994-55.699-.424-4.819-3.872-53.475 26.327-83.628.284-.284.595-.539.929-.763l70.4-47.341c1.928-1.297 4.415-1.417 6.457-.313l75.32 40.682c1.986 1.072 4.271 1.093 6.276.054 2.003-1.038 3.306-2.917 3.575-5.158l3.523-29.357c.44-3.672 2.705-6.796 6.057-8.356 3.355-1.56 7.203-1.284 10.296.745l77.729 50.945c.63.413 1.179.936 1.622 1.543 21.869 29.969 19.4 76.74 19.134 80.867-.116 30.778-25.19 55.78-55.994 55.78zm-43.496-55.782c.117 23.886 19.584 43.283 43.496 43.283 23.984 0 43.496-19.512 43.496-43.496 0-.147.005-.295.015-.441.031-.447 2.878-44.863-16.101-71.939l-74.207-48.637-3.161 26.335c-.758 6.319-4.584 11.84-10.235 14.767s-12.367 2.868-17.966-.155l-71.997-38.887-66.753 44.889c-26.426 26.907-22.32 72.996-22.275 73.461.019.199.03.407.03.607 0 23.984 19.512 43.496 43.496 43.496 23.922 0 43.395-19.412 43.495-43.311-.002-.062-.003-.123-.003-.185 0-29.961 24.376-54.336 54.336-54.336 29.962 0 54.337 24.376 54.337 54.336.001.071 0 .142-.003.213z"/><path d="m170.551 243.808c-.956 0-1.926-.22-2.836-.684-.029-.014-5.503-2.706-11.989-2.706s-11.959 2.691-12.014 2.719c-3.073 1.536-6.83.301-8.382-2.771-1.55-3.071-.34-6.81 2.724-8.374.817-.417 8.25-4.073 17.671-4.073s16.854 3.656 17.671 4.073c3.074 1.568 4.294 5.333 2.725 8.407-1.104 2.164-3.297 3.409-5.57 3.409z"/><path d="m366.208 243.808c-.956 0-1.926-.22-2.837-.684-.028-.014-5.501-2.706-11.987-2.706-6.487 0-11.96 2.691-12.015 2.719-3.074 1.536-6.83.301-8.382-2.771-1.55-3.071-.34-6.81 2.724-8.374.817-.417 8.25-4.073 17.672-4.073 9.421 0 16.854 3.656 17.671 4.073 3.074 1.569 4.293 5.333 2.724 8.408-1.103 2.163-3.296 3.408-5.57 3.408z"/><path d="m253.555 316.294c-13.54 0-24.555-11.016-24.555-24.555 0-3.451 2.798-6.25 6.249-6.25s6.249 2.798 6.249 6.25c0 6.648 5.408 12.056 12.057 12.056 6.647 0 12.055-5.408 12.055-12.056 0-3.451 2.798-6.25 6.25-6.25 3.451 0 6.249 2.798 6.249 6.25 0 13.539-11.015 24.555-24.554 24.555z"/><path d="m494.335 282.33c0-10.175-2.888-19.679-7.867-27.766 1.995-7.646 3.285-16.105 3.913-25.49.018-.271.027-.545.027-.818v-19.24c0-113.137-92.044-205.18-205.18-205.18h-63.347c-113.138.001-205.181 92.044-205.181 205.181v19.24c0 .165.003.329.01.493.381 9.446 1.908 17.827 4.24 25.311-5.171 8.194-8.176 17.884-8.176 28.269 0 24.119 16.149 44.518 38.198 51.003-.582 41.375 14.516 60.292 27.725 68.898 9.586 6.245 21.001 8.724 32.063 7.321 1.706 6.303 4.412 12.183 7.925 17.454-3.045 11.439-4.675 23.448-4.675 35.833v34.909c0 5.752 4.664 10.416 10.416 10.416s10.416-4.664 10.416-10.416v-34.909c0-6.349.511-12.579 1.479-18.66 7.555 4.731 16.248 7.724 25.554 8.439-.493 3.855-.765 7.777-.765 11.764v37.318c0 3.451 2.798 6.25 6.249 6.25s6.249-2.798 6.249-6.25v-37.319c0-4.153.332-8.229.952-12.21 11.785-1.768 22.593-7.228 31.066-15.391 8.88 15.442 23.246 26.079 39.817 28.722l-5.727 5.848c-4.794 4.897-6.557 11.76-4.714 18.36s6.906 11.559 13.544 13.264l17.307 4.443c1.6.411 3.211.612 4.802.612 5.008 0 9.817-1.994 13.456-5.709 4.795-4.896 6.557-11.759 4.715-18.362l-4.806-17.21c-.826-2.957-2.301-5.58-4.271-7.732 3.071-1.788 5.984-3.882 8.706-6.257.086.126.165.256.255.38l10.42 14.516c3.615 5.036 9.244 7.905 15.334 7.905.642 0 1.29-.031 1.94-.097 6.819-.678 12.575-4.809 15.398-11.054l1.613-3.569c.052 1.175.085 2.353.085 3.54v37.32c0 3.451 2.798 6.25 6.25 6.25 3.451 0 6.25-2.798 6.25-6.25v-37.319c0-3.986-.263-7.912-.757-11.766 9.3-.716 17.993-3.7 25.544-8.428.966 6.079 1.48 12.305 1.48 18.651v34.909c0 5.752 4.664 10.416 10.416 10.416s10.416-4.664 10.416-10.416v-34.909c0-12.388-1.629-24.402-4.675-35.844 3.833-5.752 6.71-12.224 8.37-19.185 10.564.226 20.853-2.847 29.565-9.008 16.978-12.008 26.769-33.952 29.147-65.278 22.372-6.276 38.829-26.842 38.829-51.193zm-460.729 0c0-.974.058-1.932.143-2.883 5.134 7.051 10.909 12.91 16.585 17.919l.404 13.488c-10.185-5.451-17.132-16.186-17.132-28.524zm241.577 211.244c-.785.801-2.966 2.569-6.22 1.736l-17.307-4.443c-3.259-.837-4.312-3.439-4.614-4.518-.301-1.079-.748-3.85 1.606-6.254l12.503-12.767c1.53-1.563 3.24-1.946 4.547-1.946.704 0 1.292.111 1.671.208 1.086.279 3.709 1.277 4.613 4.518l4.806 17.21c.905 3.243-.821 5.456-1.605 6.256zm39.985-30.548c-1.111.113-3.922.073-5.884-2.66l-10.42-14.516c-.795-1.108-1.122-2.203-1.204-3.185 1.365-1.874 2.645-3.835 3.824-5.885 6.489 6.251 14.349 10.915 22.966 13.552l-4.038 8.93c-1.385 3.066-4.128 3.654-5.244 3.764zm118.851-173.084-2.598 35.652c-.009.126-.016.251-.021.377-1.403 33.427-11.212 47.174-19.195 52.82-9.044 6.399-18.7 4.427-22.431 3.28-3.718-1.141-7.754-.448-10.88 1.862s-4.97 5.967-4.97 9.854c0 19.022-14.818 34.497-33.032 34.497-14.016 0-26.544-9.284-31.176-23.102-1.809-5.398-7.096-8.84-12.766-8.306-5.668.533-10.223 4.899-10.995 10.539-2.672 19.512-16.602 34.227-32.402 34.227-15.801 0-29.729-14.714-32.4-34.227-.772-5.64-5.327-10.006-10.996-10.539-.386-.037-.771-.054-1.153-.054-5.219 0-9.927 3.33-11.612 8.36-4.632 13.818-17.162 23.102-31.177 23.102-18.214 0-33.032-15.475-33.032-34.497 0-4.266-2.219-8.226-5.858-10.452-3.639-2.227-8.174-2.402-11.974-.46-5.549 2.835-14.978 4.229-23.276-1.179-12.103-7.885-17.919-27.247-16.375-54.518.019-.353.024-.707.013-1.06l-1.045-34.915c-.106-3.526-1.726-6.834-4.445-9.081-14.377-11.875-27.836-26.653-29.016-54.12v-18.984c0-99.623 81.049-180.671 180.672-180.671h63.347c99.623 0 180.671 81.048 180.671 180.671v18.824c-1.872 27.012-9.452 42.26-26.109 52.572-3.337 2.067-5.483 5.611-5.769 9.528zm23.08 20.509.931-12.781c6.049-4.403 11.181-9.426 15.469-15.173-.061 11.971-6.66 22.415-16.4 27.954z"/><path d="m264.291 389.436c-3.451 0-6.249-2.798-6.249-6.25v-11.801c0-3.451 2.798-6.25 6.249-6.25s6.25 2.798 6.25 6.25v11.801c-.001 3.452-2.799 6.25-6.25 6.25z"/><path d="m298.973 372.258c-3.451 0-6.25-2.798-6.25-6.249v-11.802c0-3.451 2.798-6.25 6.25-6.25 3.451 0 6.25 2.798 6.25 6.25v11.802c0 3.451-2.798 6.249-6.25 6.249z"/><path d="m339.423 399.874c-3.451 0-6.249-2.798-6.249-6.249v-11.801c0-3.451 2.798-6.25 6.249-6.25s6.25 2.798 6.25 6.25v11.801c0 3.451-2.799 6.249-6.25 6.249z"/></g><path d="m161.517 94.468c-3.643 0-7.179-1.914-9.09-5.317-2.817-5.016-1.035-11.365 3.98-14.182 3.595-2.019 7.328-3.933 11.095-5.689 5.215-2.43 11.411-.172 13.841 5.042 2.429 5.214.172 11.411-5.042 13.841-3.293 1.534-6.553 3.206-9.692 4.969-1.613.906-3.365 1.336-5.092 1.336z" fill="#fff"/><path d="m108.085 149.668c-1.519 0-3.06-.333-4.519-1.036-5.181-2.5-7.354-8.726-4.855-13.908 7.229-14.983 17.509-28.552 30.552-40.331 4.271-3.854 10.855-3.52 14.711.75 3.855 4.269 3.519 10.856-.75 14.711-11.034 9.964-19.698 21.378-25.751 33.923-1.796 3.722-5.515 5.891-9.388 5.891z" fill="#fff"/></g></g>\n' +
                '                                </svg>\n' +
                '                                <span>' + leaderBoardUsers[i].split(' ')[0] + '</span>\n' +
                '                            </div>\n' +
                '                            <div class="score"><span>' + leaderBoardUsers[i].split(' ')[1] + '</span></div>\n' +
                '                        </div>');

        }

        userInfo.innerHTML = '<div>\n' +
            '                                    <span>Won:</span>\n' +
            '                                    <span>' + user[1] + '</span>\n' +
            '                                </div>\n' +
            '                                <div>\n' +
            '                                    <span>Lost:</span>\n' +
            '                                    <span>' + user[2] + '</span>\n' +
            '                                </div>';
        userLevel.innerHTML = '<span>' + user[0] + '</span>';

        connection.close();
    }
}


navigation[3].addEventListener('click', function () {
    navigation[1].classList.remove('show');
    navigation[2].classList.remove('show');
    navigation[3].classList.remove('show');
    navigation[5].classList.remove('show');
    navigation[6].classList.add('show');

    document.getElementById("allGameMenu").style.display = "block";
    document.getElementById("seaBattleGamePage").style.display = "none";
    document.getElementById("dotsAndBoxesGamePage").style.display = "none";

    next_page('primary', 'games-menu');
});


