import { useTheme } from "@emotion/react";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import type * as TypesGen from "api/typesGenerated";
import { ErrorAlert } from "components/Alert/ErrorAlert";
import { Avatar } from "components/Avatar/Avatar";
import {
	SettingsHeader,
	SettingsHeaderDescription,
	SettingsHeaderTitle,
} from "components/SettingsHeader/SettingsHeader";
import { Stack } from "components/Stack/Stack";
import { TableLoader } from "components/TableLoader/TableLoader";
import { useClickableTableRow } from "hooks/useClickableTableRow";
import { PlusIcon } from "lucide-react";
import type { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

type OAuth2AppsSettingsProps = {
	apps?: TypesGen.OAuth2ProviderApp[];
	isLoading: boolean;
	error: unknown;
};

const OAuth2AppsSettingsPageView: FC<OAuth2AppsSettingsProps> = ({
	apps,
	isLoading,
	error,
}) => {
	return (
		<>
			<Stack
				alignItems="baseline"
				direction="row"
				justifyContent="space-between"
			>
				<div>
					<SettingsHeader>
						<SettingsHeaderTitle>OAuth2 Applications</SettingsHeaderTitle>
						<SettingsHeaderDescription>
							Configure applications to use Coder as an OAuth2 provider.
						</SettingsHeaderDescription>
					</SettingsHeader>
				</div>

				<Button
					component={Link}
					to="/deployment/oauth2-provider/apps/add"
					startIcon={<PlusIcon className="size-icon-sm" />}
				>
					Add application
				</Button>
			</Stack>

			{error && <ErrorAlert error={error} />}

			<TableContainer css={{ marginTop: 32 }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell width="100%">Name</TableCell>
							<TableCell width="1%" />
						</TableRow>
					</TableHead>
					<TableBody>
						{isLoading && <TableLoader />}
						{apps?.map((app) => (
							<OAuth2AppRow key={app.id} app={app} />
						))}
						{apps?.length === 0 && (
							<TableRow>
								<TableCell colSpan={999}>
									<div css={{ textAlign: "center" }}>
										No OAuth2 applications have been configured.
									</div>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

type OAuth2AppRowProps = {
	app: TypesGen.OAuth2ProviderApp;
};

const OAuth2AppRow: FC<OAuth2AppRowProps> = ({ app }) => {
	const theme = useTheme();
	const navigate = useNavigate();
	const clickableProps = useClickableTableRow({
		onClick: () => navigate(`/deployment/oauth2-provider/apps/${app.id}`),
	});

	return (
		<TableRow key={app.id} data-testid={`app-${app.id}`} {...clickableProps}>
			<TableCell>
				<Stack direction="row" spacing={1}>
					<Avatar variant="icon" src={app.icon} fallback={app.name} />
					<span className="font-semibold">{app.name}</span>
				</Stack>
			</TableCell>

			<TableCell>
				<div css={{ display: "flex", paddingLeft: 16 }}>
					<KeyboardArrowRight
						css={{
							color: theme.palette.text.secondary,
							width: 20,
							height: 20,
						}}
					/>
				</div>
			</TableCell>
		</TableRow>
	);
};

export default OAuth2AppsSettingsPageView;
