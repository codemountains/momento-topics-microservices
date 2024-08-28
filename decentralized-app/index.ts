import { CredentialProvider, TopicClient, TopicConfigurations } from "@gomomento/sdk";

const publish = async () => {
    // Create a new TopicClient instance
    const topicClient = new TopicClient({
        configuration: TopicConfigurations.Default.latest(),
        credentialProvider: CredentialProvider.fromEnvironmentVariable({
            environmentVariableName: 'MOMENTO_API_KEY',
        }),
    });

    const cacheName = process.env.MOMENTO_CACHE_NAME;
    if (!cacheName) {
        throw new Error('MOMENT_CACHE_NAME environment variable is required.');
    }

    const topicName = process.env.MOMENTO_TOPIC_NAME;
    if (!topicName) {
        throw new Error('MOMENT_TOPIC_NAME environment variable is required.');
    }

    // Publish a message to a topic
    for (let i = 0; i <= 100; i += 10) {
        console.log(`progress: ${i}%`);
        await topicClient.publish(cacheName, topicName, i.toString());

        // Wait for 2.5 seconds
        if (i < 100) {
            await new Promise(resolve => setTimeout(resolve, 2500));
        }
    }
}

// Execute the publish function
publish();
