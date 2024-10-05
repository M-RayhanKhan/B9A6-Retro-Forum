const loadAllPosts = async (category) => {

    //  console.log(`https://openapi.programming-hero.com/api/retro-forum/posts=${category?`?category=${category}`:''}`);



    const responsive = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${category ? `?category=${category}` : ''}`)
    const data = await responsive.json();
    displayLoadPosts(data.posts);
}

const displayLoadPosts = (posts) => {
    const divContainer = document.getElementById('items-container');
    divContainer.innerHTML = ''
    posts.forEach(post => {
        console.log(post);
        const div = document.createElement('div');
        div.innerHTML = `
           <div class="border-purple-600 rounded-2xl border-2 mb-4 md:p-10 ">
                    <div class="flex gap-4 ">
                        <div class="relative">
                            <img class="w-16 rounded-full" src="${post.image}">
                            <div class="absolute top-0 -right-2">
                                <p class="p-3 rounded-full w-3 ${post.isActive ? 'bg-green-600' : 'bg-red-600'}"></p>
                            </div>
                        </div>
                        <div class="space-y-3">
                            <div class="flex items-center gap-4">
                                <p id="category">#Music</p>
                            <p class='text-gray-600'>Author: <span id="author-name">${post.author.name}</span></p>
                            </div>
                            <h1 id="title" class="text-xl font-bold">
                            ${post.title}
                            </h1>
                            <p id="description" class="text-gray-500">
                            ${post.description}
                            </p>
                            <!-- message -->
                         <div class="flex justify-between">
                            <div class="flex items-center gap-4">
                                <div class="flex items-center gap-2 text-gray-500">
                                    <i class="fa-regular fa-message"></i>
                                    <p id="comment-count">${post?.comment_count}</p>
                                </div>
                                <div class="flex items-center gap-2 text-gray-500">
                                    <i class="fa-regular fa-eye"></i>
                                    <p id="view-count">${post.view_count}</p>
                                </div>
                                <div class="flex items-center gap-2 text-gray-500">
                                    <i class="fa-regular fa-clock"></i>
                                    <p id="">${post.posted_time} Min</p>
                                </div>
                            
                            </div>
                            <!-- message button -->
                            <div class="md:ml-16">
                               <button id="addToList" onclick="markAsRead('${post.description}', '${post.view_count}')">
                                <img class="w-8" src="https://img.icons8.com/?size=80&id=CLuWGSvnuOz9&format=png" alt="">
                               </button>
                            </div>
                         </div>
                           
                        </div>
                    </div>
                </div>
            </div>
    `
        divContainer.append(div)
    })
}

const markAsRead = (description, view_count) => {
    console.log(description, view_count);
    const markAsReadContainer = document.getElementById('markAsReadContainer');

    const div = document.createElement('div');
    div.innerHTML = `
   <div class="flex gap-4 rounded-lg items-center p-2 bg-gray-200 mt-5 mb-2">
   <h4 class="font-semibold text-gray-500">${description}</h4>
   <p class='flex items-center text-gray-500'><i class="fa-solid fa-eye"></i> <span>${view_count}</span></p>
   </div>
`
markAsReadContainer.appendChild(div);
handlerMarkCount()
}

const handlerMarkCount = () =>{
    const prevCount = document.getElementById('markAsReadCount').innerText;;
    const convertedCount = parseInt(prevCount);
    let sum = convertedCount + 1;
    document.getElementById('markAsReadCount').innerText = sum;
}

loadAllPosts()
const handleSearchCategory = () => {
    const searchText = document.getElementById('search-input').value;
    loadAllPosts(searchText);
}
