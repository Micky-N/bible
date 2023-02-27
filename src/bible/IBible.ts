interface IBible {
    Text: string;
    Testaments: [
        {
            Text: string;
            Books: [
                {
                    Text: string;
                    Chapters: [
                        {
                            Text: string;
                            Verses: [{}];
                        }
                    ];
                }
            ];
        }
    ];
}
