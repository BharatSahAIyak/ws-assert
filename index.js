const { io } = require("socket.io-client");

baseUrl = "https://ts.staging.bhasai.samagra.io";

const testSingleQuery = async (queryFromUser) => {
    const connectionOptions = {
        transportOptions: {
            polling: {
                extraHeaders: {
                    // Authorization: `Bearer ${localStorage.getItem('auth')}`,
                    channel: 'akai',
                },
            },
        },
        query: {
            deviceId: "59bb1c5d-4cb9-43a9-b12a-403acdc79ea2",
        },
        autoConnect: false,
        transports: ['polling', 'websocket'],
        upgrade: true,
    };

    const socket = io(baseUrl, connectionOptions);

    socket.on("connect", async () => {
        // console.log("connecting");
        setTimeout(() => {
            // console.log("Sending request");
            socket.emit("botRequest", {
                content: {
                    text: queryFromUser,
                    to: "59bb1c5d-4cb9-43a9-b12a-403acdc79ea2",
                    from: "7398050181",
                    appId: 'AKAI_App_Id',
                    channel: 'AKAI',
                    latitude: "26.7821706",
                    longitude: "79.034109",
                    city: "New Delhi",
                    state: "National Capital Territory of Delhi",
                    ip: "106.215.88.94",
                    asrId: null,
                    userId: "59bb1c5d-4cb9-43a9-b12a-403acdc79ea2",
                    conversationId: "faa94cf9-d8ee-4aeb-8312-5e6f1249307c",
                    botId: "0477e54a-09f5-4cc6-a12c-e41d298d7342"
                }
            });
        }, 1000);
    });

    socket.on("session", (session) => {
        // console.log("connected");
        // console.log({ session });
    });

    let response = ""

    function listenForResponse(socket) {
        return new Promise((resolve) => {
            let response = "";

            // Define the event listener
            socket.on("botResponse", (data) => {
                response += data.payload.text;
                // console.log(data.payload.text);

                // Check if the termination condition is met
                if (data.payload.text.includes("<end/>")) {
                    socket.close();
                    resolve(response);
                }
            });
        });
    }

    socket.connect();
    const responseFromSocket = await listenForResponse(socket);
    return responseFromSocket;
}

module.exports = { testSingleQuery }