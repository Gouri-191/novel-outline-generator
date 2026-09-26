function ChapterCard({ chapter }) {
  return (
    <div className="chapter-card">
      <div className="card-pin"></div>
      <div className="card-header">
        <h3>{chapter.title}</h3>
        <span className="act-tag">{chapter.act}</span>
      </div>
      <div className="card-body">
        <p>{chapter.summary}</p>
      </div>
    </div>
  );
}

export default ChapterCard;
