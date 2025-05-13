# ImpactTube

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/LaganYT/ImpactTube.git
   cd ImpactTube
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Features

- **Search Videos**: Search for YouTube videos using keywords.
- **Watch Videos**: Play videos directly on the platform.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Dynamic Routing**: Navigate between pages for search results and video playback.

## Folder Structure

```
ImpactTube/
├── components/       # Reusable React components (e.g., VideoList, SearchBar)
├── pages/            # Next.js pages for routing
│   ├── api/          # API routes for video and search functionality
│   ├── search/       # Search results page
│   └── watch.js      # Video playback page
├── styles/           # Global CSS styles
├── public/           # Static assets (e.g., images, icons)
└── README.md         # Project documentation
```

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request on GitHub.

## Getting the URL of Selected Videos

To get the URL of a selected video, click on the video title in the search results. The URL will be displayed or used for playing the video.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
