<template>
<section class="bg-white">
  <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
    <aside class="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
      <img
        alt=""
        src="../assets/image.jpg"
        class="absolute inset-0 h-full w-full object-cover"
      />
    </aside>

    <main
      class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
    >
      <div class="max-w-xl lg:max-w-3xl">

        <h1 class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Welcome to Shopping List App
        </h1>

        <p class="mt-4 leading-relaxed text-gray-500">
          Enter your user name and password to login
        </p>

        <form action="#" class="mt-8 grid grid-cols-6 gap-6">

          <div class="col-span-3">
            <label for="Email" class="block text-sm font-medium text-gray-700"> Email </label>

            <input
              type="email"
              id="Email"
              v-model="email"
              name="email"
              class="custom-input block w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-sky-500 invalid:text-sky-600
              focus:invalid:border-sky-500 focus:invalid:ring-sky-500"
            />
          </div>

          <div class="col-span-3 ">
            <label for="Password" class="block text-sm font-medium text-gray-700"> Password </label>

            <input
              type="password"
              id="Password"
              v-model="password"
              name="password"
              class="custom-input block w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-sky-500 invalid:text-sky-600
              focus:invalid:border-sky-500 focus:invalid:ring-sky-500"
            />
          </div>
          <div class="col-span-6">
            <label v-if="errorMessage" class="text-red-400">
                {{ errorMessage}}
            </label>
          </div>          
          <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
            @click="login"
            type="button"
            :disabled="loading"
            class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition 
            hover:bg-transparent hover:text-blue-600 focus:ring-3 focus:outline-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
          

      
          </div>
        </form>
      </div>
    </main>
  </div>
</section>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const loading = ref(false);
const router = useRouter();

const login = async (event) => {
  event.preventDefault();

  if (loading.value) return;

  loading.value = true;

  try {
    const response = await axios.post(`https://shopping-list.test/api/login`, {
      email: email.value,
      password: password.value,
    });

    if (response.status === 200) {
      localStorage.setItem('token', response.data.token);
      router.push('/dashboard');
    }
  } catch (error) {
    console.error('Login failed', error);
    errorMessage.value = 'Invalid username or password. Please try again.';
  } finally {
    loading.value = false; 
  }
};
</script>


  