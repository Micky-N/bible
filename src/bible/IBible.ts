interface IBible {
    testaments: [
        {
            value: string;
            books: [
                {
                    value: string;
                    chapters: [
                        {
                            verses: [{
                                value: string
                            }];
                        }
                    ];
                }
            ];
        }
    ];
}
