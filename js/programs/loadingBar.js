{function loadingBar(index, percentage) {
    const line = `${percentage}% ${"|".repeat(Number(percentage)/2)}`;
    changeLine(index, line);
}}