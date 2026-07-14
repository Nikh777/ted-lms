exports.instructorApprovedEmail = (name) => {
  return `<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">
<title>Instructor Application Approved</title>

<style>
body{
    background:#f4f4f4;
    font-family:Arial,Helvetica,sans-serif;
    margin:0;
    padding:0;
}

.container{
    max-width:650px;
    margin:auto;
    background:white;
    padding:40px;
    text-align:center;
}

.logo{
    width:180px;
    margin-bottom:25px;
}

.heading{
    font-size:30px;
    color:#16a34a;
    font-weight:bold;
    margin-bottom:15px;
}

.text{
    color:#444;
    font-size:16px;
    line-height:28px;
}

.box{
    margin-top:30px;
    margin-bottom:30px;
    padding:20px;
    background:#FFF8DB;
    border-left:6px solid #FFD60A;
    border-radius:8px;
    text-align:left;
}

.btn{
    display:inline-block;
    margin-top:20px;
    padding:14px 30px;
    background:#FFD60A;
    color:#000;
    text-decoration:none;
    border-radius:6px;
    font-weight:bold;
}

.footer{
    margin-top:35px;
    color:#777;
    font-size:14px;
}
</style>

</head>

<body>

<div class="container">

<a href="https://ted-edtech.vercel.app">
<img
class="logo"
src="https://i.ibb.co/7Xyj3PC/logo.png"
/>
</a>

<div class="heading">
🎉 Congratulations ${name}!
</div>

<div class="text">

Your Instructor Application has been successfully approved by the TED Admin Team.

</div>

<div class="box">

<b>You can now:</b>

<ul>
<li>Create unlimited courses</li>

<li>Upload videos & study material</li>

<li>Manage enrolled students</li>

<li>Track your earnings</li>

<li>Access Instructor Dashboard</li>

</ul>

</div>

<a
class="btn"
href="https://ted-edtech.vercel.app/dashboard/my-courses">

Go To Instructor Dashboard

</a>

<div class="footer">

Welcome to the TED Instructor Community ❤️

<br><br>

Need help?

<br>

info@ted-edu.com

</div>

</div>

</body>

</html>`;
};