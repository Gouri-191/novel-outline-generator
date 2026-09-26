# Contributing to NovelCraft

Thank you for your interest in contributing to **NovelCraft**! We welcome contributions from narrative designers, ML researchers, frontend engineers, and creative writers.

## Development Workflow

1. **Fork the Repository**
   Click the "Fork" button at the top right of this repository.

2. **Clone your Fork**
   ```bash
   git clone https://github.com/your-username/novel-outline-generator.git
   cd novel-outline-generator
   ```

3. **Set Up Environments**
   * **Backend:**
     ```bash
     python -m venv venv
     # Windows:
     venv\Scripts\activate
     # Linux/macOS:
     source venv/bin/activate
     pip install -r requirements.txt
     ```
   * **Frontend:**
     ```bash
     cd frontend
     npm install
     ```

4. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

5. **Make your changes & test**
   * Run backend: `cd backend && uvicorn main:app --reload`
   * Run frontend: `cd frontend && npm run dev`
   * Verify build: `cd frontend && npm run build`

6. **Commit and Push**
   ```bash
   git commit -m "feat: Add support for multi-POV dramatic pacing"
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**
   Submit a PR against the `main` branch with a clear explanation of your changes.

## Code Style & Conventions

- **Python**: Follow PEP 8 guidelines. Format code using `flake8` and type hints wherever feasible.
- **Frontend**: Clean React 18 functional components with Tailwind CSS utility classes and `Cabin Sketch` / `Kalam` font tokens.
- **Documentation**: Keep README and API documentation synchronized with any parameter additions.

## License

By contributing to NovelCraft, you agree that your contributions will be licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**.
