let follower = [];
let following = [];

function readJSONFile(file, callback) {
    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const data = JSON.parse(event.target.result);
            callback(data);
        } catch (error) {
            console.error("Error parsing JSON file:", error);
        }
    };
    reader.readAsText(file);
}

// followers.json
document.getElementById('input1').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        readJSONFile(file, (data) => {
            follower = data.map(item => item.string_list_data[0].value);
            follower.sort((a, b) => a.localeCompare(b));
            console.log("Followers loaded:", follower);
        });
    }
});

// following.json
document.getElementById('input2').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        readJSONFile(file, (data) => {
            following = data.relationships_following.map(item => item.string_list_data[0].value);
            following.sort((a, b) => a.localeCompare(b));
            console.log("Following loaded:", following);
        });
    }
});

document.getElementById('btn').addEventListener('click', () => {
    let notFollowingBack = following.filter(user => !follower.includes(user));

    document.getElementById('result').value = notFollowingBack.join("\n");

    document.getElementById('counter').textContent = notFollowingBack.length;

    console.log("Not following back:", notFollowingBack);
});
