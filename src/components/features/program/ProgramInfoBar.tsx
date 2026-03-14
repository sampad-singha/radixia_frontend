export default function ProgramInfoBar() {
    return (
        <div className="flex gap-10 border-y py-4 text-sm">

            <div>
                <p className="font-medium">27.5 hours</p>
                <p className="text-muted-foreground">duration</p>
            </div>

            <div>
                <p className="font-medium">120</p>
                <p className="text-muted-foreground">lessons</p>
            </div>

            <div>
                <p className="font-medium">8</p>
                <p className="text-muted-foreground">modules</p>
            </div>

            <div>
                <p className="font-medium capitalize">advanced</p>
                <p className="text-muted-foreground">level</p>
            </div>

        </div>
    )
}