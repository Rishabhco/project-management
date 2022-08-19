const concurrently = require('concurrently');
const path = require('path');

const {
    result
} = concurrently(
    [{
            command: 'npm run start',
            name: 'server',
            cwd: path.resolve(__dirname, '../server/'),
            env: {
                PORT: "3001",
                NODE_ENV: "development",
                MONGO_URI: "mongodb+srv://rishabh:rishabh@cluster0.kaxxnnq.mongodb.net/mgmt_db?retryWrites=true&w=majority"
            }

        },
        {
            command: 'npm run start',
            name: 'client',
            cwd: path.resolve(__dirname, '../client/'),
        },
    ], {
        prefix: 'name',
        killOthers: ['failure', 'success'],
        restartTries: 3,
        cwd: path.resolve(__dirname, 'scripts'),
    }
);

result.then(() => {
    console.log('All done!');
}).catch(err => {
    console.log(err);
});