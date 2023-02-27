<template>
    <div>
        <div class="navbar-nav mr-auto">
            <li class="nav-item">
                <router-link :to="{name: 'home'}" class="nav-link">home</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name: 'bible.index'}" class="nav-link">bible</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name: 'about'}" class="nav-link">about</router-link>
            </li>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style></style>
