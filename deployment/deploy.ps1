param(
$ServerName = (Read-Host -Prompt 'Enter ServerName'),
[switch] $install_services = $true
)

Start-Transcript -Path D:\logs\DeploymentLogs\UserManagement.console.log 

#fetch script path
$scriptPath = split-path -parent $MyInvocation.MyCommand.Definition

#define service name
$ServiceName = "User Management"
write-host "##############################################"
write-host "$ServiceName deployment"
write-host "##############################################" `n
write-host "deploying package path version" $scriptPath `n


#function to install service
Function InstallService([string] $ServiceName){
    Set-Location -Path $scriptPath
    
    write-host "Installing Node Modules..." `n

    npm install --loglevel=error

    node 'D:\Parvez Project\UserManagement\deployment\windows-service.js'
 
    Write-Host $ServiceName "installation in progress..."  `n
    Start-Sleep -Seconds 10
            
}

#function to stop service
Function StopService([string] $ServiceName){
    Get-Service $ServiceName -ComputerName localhost | Set-Service -Status Stopped verbs runas Administrator
    Write-Host $ServiceName "service is stopped" `n
}

#function to remove service
Function RemoveService([string] $ServiceName){
    (Get-WmiObject Win32_Service -Filter "name='$ServiceName'") | Remove-WmiObject verbs runas Administrator
    Write-Host $ServiceName "application is uninstalled successfully" `n
}

# installing service
If ($install_services -eq $true)
{
	If (Get-Service $ServiceName -ErrorAction SilentlyContinue) 
	{
        if ((Get-Service $ServiceName).Status -eq 'Running')
        {
            Write-Host $ServiceName "service is Running" `n
            #function to stop service
            StopService ($ServiceName)
            #function to remove service
            RemoveService ($ServiceName)
            #function to install and start service
            InstallService ($ServiceName)
                                            
        }
        else
        {
            Write-Host $ServiceName "Service is Stopped" `n
            #function to remove service
            RemoveService ($ServiceName)
            #function to install and start service
            InstallService ($ServiceName)
         }
	}
	else 
	{
         Write-Host "$ServiceName service is not exist" `n
         #function to install and start service
         InstallService ($ServiceName) 
	}
# waiting 10sec to exit
write-host "Please wait for 10 seconds and check the log in the followed path::" $scriptPath\$ServiceName.out -BackgroundColor Cyan -ForegroundColor Black
Start-Sleep -Seconds 10
}
Stop-Transcript