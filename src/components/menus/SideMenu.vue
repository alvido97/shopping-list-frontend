<template>
    <div class="w-64 min-h-screen bg-white border-r shadow-md flex flex-col">
        <div class="p-6">
            <div class="h-12 w-32 flex items-center justify-center rounded-lg bg-gray-100 text-sm font-semibold text-gray-700">
                Welcome
            </div>
        </div>
        
        <nav class="flex-1 px-4 space-y-2">
            <RouterLink to="/dashboard" class="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition">
                Dashboard
            </RouterLink>
            
            <details class="group">
                <summary class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition">
                    <span class="text-sm font-medium">Shopping List</span>
                    <span class="transition-transform transform group-open:rotate-180">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                        </svg>
                    </span>
                </summary>
                <ul class="mt-2 space-y-1 px-4">
                    <li>
                        <RouterLink to="/shopping-list" class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition">
                            List
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/create-shopping-list" class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition">
                            Create
                        </RouterLink>
                    </li>
                </ul>
            </details>
            
            <button @click="logout" class="w-full text-left rounded-lg px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition">
                Logout
            </button>
        </nav>
        
        <div class="border-t p-4 text-center text-sm text-gray-500">
            &copy; Azbow
        </div>
   
    </div>

</template>

    
<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const logout = async (event) => {
    event.preventDefault(); 

    try {
        const token = localStorage.getItem('token'); 

        const response = await axios.post(
            `https://shopping-list.test/api/logout`, 
            {}, 
            {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            }
        );

        if (response.status === 200) {
            localStorage.removeItem('token'); 
            router.push('/'); 
        }
    } catch (error) {
        console.error('Logout failed', error);
    }
};
  
    
</script>