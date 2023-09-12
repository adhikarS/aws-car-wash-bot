exports.handler = async (event) => {
    // TODO: add your function logic here

    const response = {
        statusCode: 200,
        body: JSON.stringify('Booking confirmed!'),
    };
    return response;
};
