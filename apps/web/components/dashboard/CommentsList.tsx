interface CommentItem {
  t: string;
  n: string;
  f: string;
  tone: string;
  tag: string;
  txt: string;
}

interface Props {
  comments: CommentItem[];
}

export default function CommentsList({ comments }: Props) {
  return (
    <div>
      {comments.map((c, i) => (
        <div key={i} className="item">
          <div className="time">{c.t}</div>
          <div className="item-body">
            <div className="item-head">
              <span className="name">{c.n}</span>
              <span className="folder-tag">
                <span className="dot"></span>
                {c.f}
              </span>
              <span className={`badge ${c.tone}`}>{c.tag}</span>
            </div>
            <div className="item-text">{c.txt}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
