# MissionDriven Assignment

콘텐츠 등록 폼을 구현한 웹 애플리케이션입니다.

## 🛠️ 기술 스택

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Zustand · react-day-picker · react-hot-toast

## 📦 주요 구조

```
app/
├── components/          # UI 컴포넌트
│   ├── detail-info/    # 상세 정보 모달
│   └── ...
├── lib/                # 공통 UI (Modal, Backdrop, Toast)
├── store/              # Zustand 상태 관리
└── page.tsx            # 메인 페이지
public/
├── fonts/pretendard/   # 폰트
└── icon/               # SVG 아이콘
```

## 🚀 실행 방법

### 로컬 실행

```bash
git clone https://github.com/sdc9787/missiondriven-assignment.git
cd missiondriven-assignment
npm install
npm run dev
```

http://localhost:3000 접속

### Docker 실행

```bash
docker compose up --build
```
