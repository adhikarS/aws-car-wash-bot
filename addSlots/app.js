const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const { time, date, isBooked, bookedBy } = JSON.parse(event.body); //assuming you're sending these in the body of your request

  const params = {
    TableName: 'Slots', // name of your DynamoDB table
    Item: {
      slotId: Date.now(), // assuming slotId is unique for each item (slot)
      time,
      date,
      isBooked,
      bookedBy,
    },
  };

  try {
    const data = await docClient.put(params).promise();
    const response = {
      statusCode: 200,
      body: JSON.stringify('Slot added successfully!'),
    };
    return response;
  } catch (err) {
    console.log(err);
    const response = {
      statusCode: 500,
      body: JSON.stringify('Error adding slot.'),
    };
    return response;
  }
};
