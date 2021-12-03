<template>
    <div class="user-dropdown">
        <span class="d-none d-sm-block">{{ user.name }}</span>
        <div class="user-dropdown-img">
            <Gravatar :email="user.email" alt="Usuário" />
        </div>
        <i class="fa fa-angle-down"></i>
    </div>    
</template>

<script>
import {mapState} from 'vuex'
import Gravatar from 'vue-gravatar'

export default {
  name: "userDropdown",
  components:{ Gravatar },
  computed: mapState(['user'])
};
</script>

<style>
.user-dropdown{
    height:100%;
}
.user-button {
    display:flex;
    align-items: center;
    color: #fff;
    font-weight: 100;
    height: 100%;
    padding: 0px 20px;
}

.user-dropdown:hover{
    background-color: rgba(0, 0, 0, 0.2)
}

.user-dropdown-img{
    margin: 0px 10px;
}

.user-dropdown-img > img{
    max-height: 37px;
    border-radius: 5px;
}

</style>