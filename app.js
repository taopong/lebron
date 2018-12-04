function handleSignUp() {
    let name = document.querySelector('#name').value;
    let password = document.querySelector('#password').value;
    fetch('/users/signup', {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            password,
        })
    })
        .then(value => value.json())
        .then(value => {
            if (value.stat === 1) {
                alert('successfully sign up!')
            } else {
                alert('unsuccessfully sign up!')
            }
        })
}

function handleSignIn() {
    let name = document.querySelector('#name').value;
    let password = document.querySelector('#password').value;
    fetch('/users/signin', {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            password,
        })
    })
        .then(value => value.json())
        .then(value => {
            if (value.stat === 1) {
                alert('successfully sign in!');
                localStorage.setItem('user', JSON.stringify(value.result))
                document.querySelector('.auth').innerHTML = ` welcome to <b>${value.result.name}</b>`
            } else {
                alert('unsuccessfully sign in!')
            }
        })
}

function handleToSignIn() {
    document.querySelector('#toSignUp').setAttribute('style', 'display:block');
    document.querySelector('#toSignIn').setAttribute('style', 'display:none');
    document.querySelector('#signIn').setAttribute('style', 'display:block');
    document.querySelector('#signUp').setAttribute('style', 'display:none');
}

function handleToSignUp() {
    document.querySelector('#toSignUp').setAttribute('style', 'display:none');
    document.querySelector('#toSignIn').setAttribute('style', 'display:block');
    document.querySelector('#signIn').setAttribute('style', 'display:none');
    document.querySelector('#signUp').setAttribute('style', 'display:block');
}

function handleKeyUp(event) {
    if (event.keyCode === 13) {
        handleSubmit();
    }
}

function handleSubmit() {
    let content = document.querySelector('#comment').value;
    let user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        alert('need to sign in ');
        return
    }
    fetch('/messages', {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content,
            user_id: user.id,
        })
    })
        .then(value => value.json())
        .then(value => {
            if (value.stat === 1) {
                retrieveComments();
                alert('successfully submit!');
            } else {
                alert('unsuccessfully submit!')
            }
        })
}

function retrieveComments() {
    fetch('/messages')
        .then(value => value.json())
        .then(value => {
            document.querySelector('#comments').innerHTML =
                value.result.map(v => `<li>
                                        <h3>${v.name}</h3>
                                        <p>${v.content}</p>
                                    </li>`)
                    .join('')
        })
}

function retrievePosts() {
    fetch('/posts')
        .then(value => value.json())
        .then(value => {
            document.querySelector('#posts').innerHTML =
                value.result.map(v => `<div class="post">
                                            <h3>${v.title}</h3>
                                            <p>${v.content}</p>
                                        </div>`)
                    .join('')
        })
}

function init() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        document.querySelector('.auth').innerHTML = ` welcome to <b>${user.name}</b>`
    }
    retrieveComments();
    retrievePosts();
}

init();