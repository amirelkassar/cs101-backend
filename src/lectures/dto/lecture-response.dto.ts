export interface LectureSummary {
  id: string;
  title: string;
  order: number;
}

export interface LecturePageRef {
  id: string;
  title: string;
  slug: string;
  icon: string;
}

export interface LectureDetail extends LectureSummary {
  pages: LecturePageRef[];
}