function JobSpecifics({ comment, onCommentChange }) {
    return (
        <div>
            <label>Enter any special details here: </label>
            <textarea
                value={comment}
                onChange={(e) => onCommentChange(e.target.value)}
                placeholder="Type here..."
                style={{
                    width: "100%",
                    minHeight: "110px",
                    resize: "vertical",
                    boxSizing: "border-box",
                    lineHeight: "1.4",
                }}
            />
        </div>

    )
}
export default JobSpecifics