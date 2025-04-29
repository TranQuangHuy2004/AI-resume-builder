import { Button } from '@/components/ui/button';

function ShareButton({ resumeId, resumeInfo }) {
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${resumeInfo?.firstName} ${resumeInfo?.lastName} resume`,
                    text: "Hello Everyone, This is my resume please open url to see it",
                    url: import.meta.env.VITE_BASE_URL + "/my-resume/" + resumeId + "/view",
                });
                console.log(import.meta.env.VITE_BASE_URL + "/my-resume/" + resumeId + "/view");
                console.log("shared successfully!");
            } catch (error) {
                console.error("Error sharing:", error);
            }
        } else {
            alert("Sharing is not supported on this browser.");
        }
    };

    return (
        <Button onClick={handleShare}>
            Share
        </Button>
    );
}

export default ShareButton;
