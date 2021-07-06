
const search=document.querySelector(".search_btn")
const recipe_list=document.querySelector(".main_result")
const full_recipe=document.querySelector(".full_recipe")
const full_recipe_btn=document.querySelector(".get-recipe")

search.addEventListener("click",processing)
recipe_list.addEventListener("click",wholeRecipe)


function processing(){
    const user_input=document.querySelector("#search_input").value.trim()
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${user_input}`)
    .then(response=>response.json())
    .then(data=>{
        let html=""
        if(data.meals){
            data.meals.forEach(recipe => {
                html+=`<div class="search_result" data-id="${recipe.idMeal}">
                            <div class="top">
                             <img src="${recipe.strMealThumb}">
                            </div>
                            <div class="bottom">
                              <h3>${recipe.strMeal}</h3>
                               <button  class="get-recipe">Get Recipe</button>
                            </div>
                        </div>`
            });
            recipe_list.classList.remove("not_found")    
        }
        else{
            html="Sorry, We dont have any recipies for that ingredient";
            recipe_list.classList.add("not_found")
        }
        recipe_list.innerHTML=html
    })
}

function wholeRecipe(e){
    
    e.preventDefault();
    if(e.target.classList.contains("get-recipe")){
            
        full_recipe.style.display="block"
        let theId=e.target.parentElement.parentElement.dataset.id;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${theId}`)
       .then(response=>response.json())
       .then(data=>{
            let html=""
           let new_data=data.meals[0];
           console.log(new_data)
           html+=`<div>
                    <button id="close_window"><i class="fas fa-times-circle"></i></button>
                    <h2 id="internal_heading">${new_data.strMeal}</h2>
                    <small>type--${new_data.strCategory}</small>
                    <div>
                        <h3>Instructions:</h3>
                        <p>${new_data.strInstructions}</p>
                    </div>
                    <img src="${new_data.strMealThumb}">
                    <a id="youtube" target="_blank" href="${new_data.strYoutube}">Watch Recipe on YouTube</a>
                </div>`

                full_recipe.innerHTML=html;
                const closer=document.querySelector("#close_window")
                closer.addEventListener("click",()=>{
                full_recipe.style.display="none"
                })
       })
       
    }
    
}

