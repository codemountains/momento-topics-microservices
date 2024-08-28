import { Configurations, CredentialProvider, TopicClient } from "@gomomento/sdk-web";
import { useCallback, useEffect, useRef, useState } from "react";

export function Subscriber() {
    const authToken = import.meta.env.VITE_MOMENTO_API_KEY;
    const cacheName = import.meta.env.VITE_MOMENTO_CACHE_NAME;
    const topicName = import.meta.env.VITE_MOMENTO_TOPIC_NAME;

    const [progressValue, setProgressValue] = useState<number>(0);
    const topicClientRef = useRef<TopicClient | null>(null);

    const updateProgress = useCallback((value: string) => {
        setProgressValue(Number(value));
    }, []);

    useEffect(() => {
        async function startSubscription() {
            if (topicClientRef.current) return;

            const topicClient = new TopicClient({
                configuration: Configurations.Browser.v1(),
                credentialProvider: CredentialProvider.fromString({ authToken }),
            });

            topicClientRef.current = topicClient;
            await topicClientRef.current.subscribe(cacheName, topicName, {
                onItem: (data) => {
                    console.log(data);
                    updateProgress(data.valueString());
                },
                onError: (err) => console.log(err),
            });
        }

        startSubscription();
    }, [authToken, cacheName, topicName, updateProgress]);

    return (
        <div className="container mx-auto max-w-2xl px-4">
            <div className="w-full flex justify-center items-center">
                <h2 className="p-2 text-lg">Progress</h2>
            </div>
            <div className="w-full flex justify-center">
                <progress className="progress progress-primary w-96" value={progressValue} max="100"></progress>
            </div>
            <div className="w-full flex justify-center items-center mt-8">
                <h2 className="p-2 text-lg">Radial progress</h2>
            </div>
            <div className="w-full flex justify-center">
                <div 
                    className="radial-progress text-success m-2"
                    style={{ "--value": progressValue, "--size": "10rem", "--thickness": "0.8rem" }}
                    role="progressbar"
                >
                    {progressValue} %
                </div>
            </div>
        </div>
    );
}
