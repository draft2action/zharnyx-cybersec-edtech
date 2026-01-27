import { LoaderOne } from "@/components/ui/loader";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md">
            <LoaderOne />
        </div>
    );
}
