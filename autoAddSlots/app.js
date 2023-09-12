const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const params = {
    TableName: 'Slots', // name of your DynamoDB table
  };

  // Assuming July 2023 has 31 days, replace this with the number of days in the month you want to setup the slots for
  const daysInMonth = 31;
  const startHour = 8; // Start hour for the slots
  const endHour = 17; // End hour for the slots (5 PM)

  for (let day = 1; day <= daysInMonth; day++) {
    const date = `2023-07-${day.toString().padStart(2, '0')}`;
    // Define 8 slots within a day
    for (let slot = 1; slot <= 8; slot++) {
      const startTime = `${startHour + slot - 1}:00`;
      const endTime = `${startHour + slot}:00`;

      const slotParams = {
        ...params,
        Item: {
          slotId: `${date}-slot-${slot}`, // unique ID for the slot
          time: `${startTime} - ${endTime}`, // Define time range for the slot
          date,
          isBooked: false, // initialize all slots as not booked
          bookedBy: null, // no one has booked the slot yet
        },
      };

      try { 
        await docClient.put(slotParams).promise();
      } catch (err) {
        console.log(err);
        return {
          statusCode: 500,
          body: JSON.stringify('Error adding slot.'),
        };
      }
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify('Slots for July 2023 added successfully!'),
  };
};
