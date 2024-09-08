# Bible and Early Church Fathers Resource

## Introduction

This project is a comprehensive Bible and Early Church Fathers resource website. It provides access to the Septuagint and the complete works of the Early Church Fathers, translated by Philip Schaff. The site includes features for reading, note-taking, and highlighting, making it a valuable tool for biblical and patristic studies.

## Features

- Full text of the Orthodox Canon of Scripture
- Complete works of the Early Church Fathers
- User authentication and account management
- Note-taking and highlighting functionality
- Customizable reading experience (font size, type, dark mode)
- Mobile-responsive design

## Technologies Used

- Backend: Node.js, Express.js
- Database: PostgreSQL
- Frontend: EJS templates, Tailwind CSS
- Authentication: Passport.js
- Email: SendGrid

## Installation and Setup

1. Clone the repository:

   ```
   git clone https://github.com/L1LSM0K13/AncientBible.git
   cd AncientBible
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the project root directory with the following variables:

   ```
   DB_USER=devuser
   DB_PASSWORD=devpassword
   DB_HOST=localhost
   DB_PORT=5432
   DB_DATABASE=ancientbible
   SESSION_SECRET=your_session_secret
   SENDGRID_API_KEY=your_sendgrid_api_key
   APP_DOMAIN=localhost:4000
   ```

4. Start the PostgreSQL database using Docker:

   ```
   docker-compose up -d
   ```

5. Set up the database:
   - The database will be automatically created by Docker
   - Run the migrations to get the database tables setup:

     ```
     npm run migratedb
     ```

6. Start the development server:

   ```
   npm run start:dev
   ```

   This will run the node server and the Tailwind CSS watcher together.  If you prefer to run them in separate terminals you can run these commands separately:

   ```
   npm run nodemon
   npm run tailwind
   ```

7. Access the application in your browser at `http://localhost:4000`

## Usage

Our website is user-friendly and designed for easy navigation. You can:

- **Read Scripture**: Access the full text of the Orthodox Canon of Scripture, organized by book, chapter, and verse.
- **Explore Church Fathers**: Browse through the works of the Early Church Fathers, organized by volume and author. Each work includes detailed introductions and footnotes provided by Philip Schaff.

## Contributing

Contributions to this project are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Philip Schaff for his translations of the Early Church Fathers
- [Christian Classics Ethereal Library](https://ccel.org/) for providing public domain texts

## Contact Me

If you have any questions, feedback, or suggestions, feel free to reach out to me @ <nico@ancientbible.org>.

---

Our website includes the Orthodox Canon of Scripture, which consists of:

### Old Testament

1. Genesis
2. Exodus
3. Leviticus
4. Numbers
5. Deuteronomy
6. Joshua
7. Judges
8. Ruth
9. 1 Samuel (1 Kingdoms in some traditions)
10. 2 Samuel (2 Kingdoms in some traditions)
11. 1 Kings (3 Kingdoms in some traditions)
12. 2 Kings (4 Kingdoms in some traditions)
13. 1 Chronicles (1 Paralipomenon in some traditions)
14. 2 Chronicles (2 Paralipomenon in some traditions)
15. 1 Esdras (1 Esdras also known as 1 Ezra in some traditions)
16. 2 Esdras (2 Esdras also known as just Ezra in some traditions)
17. Tobit
18. Judith
19. Esther (including additions)
20. 1 Maccabees
21. 2 Maccabees
22. 3 Maccabees
23. 4 Maccabees
24. Job
25. Psalms
26. Proverbs
27. Ecclesiastes
28. Song of Solomon (Song of Songs)
29. Wisdom of Solomon
30. Wisdom of Sirach (Ecclesiasticus)
31. Isaiah
32. Jeremiah
33. Lamentations
34. Baruch (including Letter of Jeremiah)
35. Ezekiel
36. Daniel (including additions)
37. Hosea
38. Joel
39. Amos
40. Obadiah
41. Jonah
42. Micah
43. Nahum
44. Habakkuk
45. Zephaniah
46. Haggai
47. Zechariah
48. Malachi

### New Testament

1. Matthew
2. Mark
3. Luke
4. John
5. Acts of the Apostles
6. Romans
7. 1 Corinthians
8. 2 Corinthians
9. Galatians
10. Ephesians
11. Philippians
12. Colossians
13. 1 Thessalonians
14. 2 Thessalonians
15. 1 Timothy
16. 2 Timothy
17. Titus
18. Philemon
19. Hebrews
20. James
21. 1 Peter
22. 2 Peter
23. 1 John
24. 2 John
25. 3 John
26. Jude
27. Revelation

We hope this resource enriches your study and understanding of the Bible and the Early Church Fathers. Happy reading!
