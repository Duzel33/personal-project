function JobSpecifics({ comment, onCommentChange }) {
    return (
        <div>
            <label>Enter any special details here: </label>
            <textarea
                type="text"
                value={comment}
                onChange={(e) => onCommentChange(e.target.value)}
                placeholder="Type here..."
                style={{
                    width: "100%",
                    overflow: "hidden",   // 🚫 hides scrollbar
                    resize: "none",       // 🚫 disables manual resize
                    boxSizing: "border-box",
                    lineHeight: "1.4",
                }}
                />
        </div>

    )
}
export default JobSpecifics