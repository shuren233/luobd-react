##### router 规则

```
   {
       path[*1]: '/子系统名字/项目名字',
       meta[*2]: {
           title: '', // 名字
           icon: 'icon-liebiao', // 图标
           onlyOne： boolean, // 当前目录只有一级时使用，即没有下拉箭头
           roles: { // 权限
                page： 'xx', 菜单权限
                btnRoles: {} // 按钮权限
           }
       },
       component[*4]: () => import('@/layouts/default.vue'), // 这个一般不变
       children[*5]: [
           {
               path: '/子系统名字/项目名字/自定义',
               meta[*2]: {
                   title: 'xxx',
                   roles: { // 权限
                        page： 'xx', 菜单权限
                        btnRoles: {} // 按钮权限
                   }
               },
               component[*7]: () =>
                   import('@/views/xxx/xxx.vue'),
           },
       ],
   }

```
