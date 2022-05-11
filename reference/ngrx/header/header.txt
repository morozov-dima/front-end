// **********************************************************************
// **************************** Example 1 *******************************
// **********************************************************************



// ************************** header.component.html **********************

<header>
    <div class="header-content">
        <ul>
            <li>
                <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
            </li>
            <li>
                <a routerLink="users" routerLinkActive="active">Users</a>
            </li>
            <li>
                <a routerLink="posts" routerLinkActive="active">Posts</a>
            </li>
        </ul>
    </div>
</header>






// ************************** header.component.css **********************
header {
    width: 100%;
}

.header-content {
    margin:10px;   
}

.header-content ul {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.header-content ul li {
    list-style: none;
    padding:10px;
}

.header-content ul li a {
    text-decoration: none;
}

.header-content ul li a:hover {
    text-decoration: underline;
}

.active {
    font-weight: bold;
}






