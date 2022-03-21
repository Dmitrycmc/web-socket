const userName = prompt("Введите ваше имя");

let socket = new WebSocket("ws://localhost:8999");

declare interface Window {
    send: (message: string) => void;
}

window.send = (message: string) => {
    socket.send(message);
    console.log(`[sent] ${message}`);
};

socket.onopen = function(e) {
    console.log("[opened] Соединение установлено");
    const message = `Меня зовут ${userName}`;
    socket.send(message);
    console.log(`[sent] ${message}`);
};

socket.onmessage = function(event) {
    console.log(`[received] ${event.data}`);
};

socket.onclose = function(event) {
    if (event.wasClean) {
        console.log(`[closed] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
    } else {
        // например, сервер убил процесс или сеть недоступна
        // обычно в этом случае event.code 1006
        console.log('[closed] Соединение прервано');
    }
};

socket.onerror = function(error) {
    console.log(`[error] ${error}`);
};