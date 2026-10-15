export const handler = async (event) => {
    console.log("Incoming event:", JSON.stringify(event));

    let payload;

    try {
        if (typeof event.body === "string") {
            payload = JSON.parse(event.body);
        } else if (
            event.body &&
            typeof event.body === "object"
        ) {
            payload = event.body;
        } else {
            payload = event;
        }

        if (
            !payload ||
            typeof payload !== "object" ||
            Array.isArray(payload)
        ) {
            throw new Error("Request body must be a JSON object");
        }
    } catch (error) {
        console.log("Invalid request body:", error.message);

        return {
            statusCode: 400,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: "Please provide a valid JSON object."
            })
        };
    }

    console.log("Received data:", JSON.stringify(payload));

    const submissionId = Math.random()
        .toString(36)
        .substring(2, 10);

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: "Data successfully received and logged!",
            id: submissionId
        })
    };
};