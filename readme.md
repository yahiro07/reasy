# reasy

A useState wrapper.
It makes easier to manage a set of multiple editable values. 

## basics

Here, this code
```ts
  const [name, setName] = useState("user1");
  const [age, setAge] = useState(20);
  const [sex, setSex] = useState("male");
  const [avatar, setAvatar] = useState("/user.png");
```
is replaced by using reasy like this
```tsx
const [{ name, age, sex, avatar }, { setName, setAge, setSex, setAvatar }] =
  useReasyState({
    name: "user1",
    age: 20,
    sex: "male",
    avatar: "/user.png",
  });
```

## usage example
```tsx
const [v, m] = useReasyState({
  name: "user1",
  age: 20,
  sex: "male",
  avatar: "/user.png",
});
<Form>
  <TextInput value={v.name} setValue={m.setName} />
  <NumberInput value={v.age} setValue={m.setAge} />
  <RadioGroup values={["male", "female"]} value={v.sex} setValue={m.setSex} />
  <AvatarSelector avatar={v.avatar} setAvatar={m.setAvatar} />
</Form>;
```
This example is assuming the edit part of user profile.  
Non-destructured pattern might be cleaner than destructured variables.

## license
MIT
