

import {createRouter as _createRouter, createWebHashHistory, createWebHistory} from 'vue-router';

const pages = import.meta.glob('/src/pages/**/*.vue');

const routes = Object.keys(pages).map((path)=>{
    let name = path.match(/\/pages(.*)\.vue$/)[1].toLowerCase();
    if(name.substring(name.length - 5) == 'index'){
        name = name.slice(0, -5);//去掉最后的index
    } 
    return {
        path: name === '/homepage' ? '/': name,
        name: name.slice(1),
        component: pages[path]
    }
})
console.log(routes)

export function createRouter() {
    return _createRouter({
        // history: createWebHistory(),
        history: createWebHashHistory(),
        routes
    })
}
