import 'dotenv/config';

export default ({ config }) => ({
    ...config,
    extra: {
        ...config.extra,
        apiToken: process.env.API_JWT_TOKEN,
    },
});
